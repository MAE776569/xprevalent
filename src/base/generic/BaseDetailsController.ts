import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import { ValidationSchema, validateParam } from "../../validators";
import BaseController from "./BaseController";

class BaseDetailsController extends BaseController {
  // Model
  protected readonly model!: Model<Document>;

  // Params and validation
  protected keyParam: string = "id";
  protected validationSchema: ValidationSchema;

  // Query fields
  protected findOne: boolean = false;
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

  protected getQueryResult() {
    let querySet;
    if (this.findOne) {
      querySet = this.model.findOne(this.queryFilter);
    } else {
      const id = this.req.params[this.keyParam];
      querySet = this.model.findById(id);
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

export = BaseDetailsController;
