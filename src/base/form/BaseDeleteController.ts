import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import { ValidationSchema, validateParam } from "../../validators";
import BaseController from "../generic/BaseController";

class BaseDeleteController extends BaseController {
  // Model
  protected readonly model!: Model<Document>;

  // Params and validation
  protected keyParam: string = "id";
  protected validationSchema: ValidationSchema;

  // Query fields
  protected deleteOne: boolean = false;
  private queryFilter: FillableObject = {};

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.queryFilter = this.getQueryFilter();
    this.validationSchema = new ValidationSchema({
      [this.keyParam]: (<any>validateParam()).isMongoId()
    });
  }

  protected getQueryFilter() {
    return {};
  }
}

export = BaseDeleteController;
