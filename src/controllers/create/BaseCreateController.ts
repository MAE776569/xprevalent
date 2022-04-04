import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import { ValidationObject } from "../../types/validation/schema";
import { ValidationSchema } from "../../validators";
import BaseController from "../generic/BaseController";

class BaseCreateController extends BaseController {
  // Model
  protected readonly model!: Model<Document>;

  // Validation
  protected validationSchema!: ValidationSchema;

  protected get validationResult(): ValidationObject {
    return this.validationSchema.validate(this.req);
  }

  protected getDocument(): FillableObject {
    return this.validationResult.getValue("body");
  }

  protected getQueryResult() {
    const document = this.getDocument();
    return this.model.create(document);
  }
}

export = BaseCreateController;
