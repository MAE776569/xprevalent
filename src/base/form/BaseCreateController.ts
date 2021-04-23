import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/base";
import { ValidationObject } from "../../types/validation/schema";
import { ValidationSchema } from "../../validators";
import BaseController from "../BaseController";

class BaseCreateController extends BaseController {
  // Model and query result object name
  protected readonly model!: Model<Document>;
  protected queryObjectName: string = "data";

  // Validation
  protected validationSchema!: ValidationSchema;
  protected validationResult: ValidationObject;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.validationResult = this.validationSchema.validate(req);
  }

  protected getDocument(): FillableObject {
    return this.validationResult.getSanitizedValue();
  }

  protected getQueryResult() {
    const document = this.getDocument();
    return this.model.create(document);
  }
}

export = BaseCreateController;
