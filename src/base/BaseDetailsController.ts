import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import { FillableObject } from "../types/base";
// import { ValidationSchema } from "../validators";
// import { validateParam } from "../validators";
import BaseController from "./BaseController";

class BaseDetailsController extends BaseController {
  // Model and query result object name
  protected readonly model!: Model<Document>;
  protected queryObjectName: string = "data";

  // Params and validation
  protected keyParam: string = "id";
  // private validation: ValidationSchema;

  // Query fields
  protected findOne: boolean = false;
  private queryFilter: FillableObject = {};

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    // this.validation = new ValidationSchema({
    //   [this.keyParam]: validateParam().isMongoId()
    // });
    this.queryFilter = this.getQueryFilter();
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
