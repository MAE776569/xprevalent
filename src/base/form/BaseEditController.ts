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

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.queryFilter = this.getQueryFilter();
    this.paramValidation = new ValidationSchema({
      [this.keyParam]: (<any>validateParam()).isMongoId()
    });
  }

  protected get validationResult(): ValidationObject {
    if (!this.validation) {
      this.validation = this.validationSchema.validate(this.req);
    }
    return this.validation;
  }

  protected getQueryFilter() {
    return {};
  }

  protected getUpdateSet(): FillableObject {
    return this.validationResult.getSanitizedValue();
  }

  protected getQueryResult() {
    let querySet;
    const updateSet = this.getUpdateSet();
    const options: FillableObject = { new: true };
    if (this.upsert) {
      options.upsert = this.upsert;
    }
    if (this.updateOne) {
      querySet = this.model.findOneAndUpdate(
        this.queryFilter,
        updateSet,
        options
      );
    } else {
      const id = this.req.params[this.keyParam];
      querySet = this.model.findByIdAndUpdate(id, updateSet, options);
    }
    if (this.populatedFields) {
      const populatedPaths = this.populatedFields.join(" ");
      querySet.populate(populatedPaths);
    }
    if (this.selectedFields) {
      querySet.select(this.selectedFields);
    } else if (this.excludedFields) {
      const excludedPaths = this.excludedFields
        .map((item) => `-${item}`)
        .join(" ");
      querySet.select(excludedPaths);
    }
    return querySet.exec();
  }
}

export = BaseEditController;
