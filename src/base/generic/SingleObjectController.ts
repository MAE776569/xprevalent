import { ValidationObject } from "../../types/validation/schema";
import { validateParam, ValidationSchema } from "../../validators";
import BaseController from "./BaseController";

class SingleObjectController extends BaseController {
  // Params and validation
  protected keyParam: string = "id";
  protected validationSchema!: ValidationSchema;
  private validation!: ValidationObject;

  protected get validationResult(): ValidationObject {
    if (!this.validation) {
      this.validation = this.validationSchema.validate(this.req);
    }
    return this.validation;
  }

  protected validateKeyParam() {
    const validationSchema = new ValidationSchema({
      [this.keyParam]: (<any>validateParam()).isMongoId()
    });
    const validationResult = validationSchema.validate(this.req);
    return validationResult.hasError(this.keyParam);
  }

  protected getQueryFilter() {
    return {};
  }
}

export = SingleObjectController;
