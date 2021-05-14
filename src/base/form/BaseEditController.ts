import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import { ValidationObject } from "../../types/validation/schema";
import { ValidationSchema, validateParam } from "../../validators";
import BaseController from "../generic/BaseController";

class BaseEditController extends BaseController {
  // Model
  protected readonly model!: Model<Document>;

  // Params and validation
  protected keyParam: string = "id";
  protected paramValidation: ValidationSchema;
  protected validationSchema!: ValidationSchema;
  private validation!: ValidationObject;

  // Query fields
  protected updateOne: boolean = false;
  protected upsert: boolean = false;
  private queryFilter: FillableObject = {};
}

export = BaseEditController;
