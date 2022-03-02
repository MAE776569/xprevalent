import { ValidationObject } from "../../types/validation/schema";
import { validator, ValidationSchema } from "../../validators";
import BaseController from "./BaseController";

class SingleObjectController extends BaseController {
  // Params and validation
  protected idParam: string = "id";
  protected validationSchema!: ValidationSchema;
  private validation!: ValidationObject;

  protected get validationResult(): ValidationObject {
    if (!this.validation) {
      this.validation = this.validationSchema.validate(this.req);
    }
    return this.validation;
  }

  protected validateIdParam(): boolean {
    const validationSchema = new ValidationSchema({
      params: validator.object({
        [this.idParam]: validator.string().mongoId()
      })
    });
    const validationResult = validationSchema.validate(this.req);
    return validationResult.hasError({
      name: this.idParam,
      location: "params"
    });
  }

  protected getQueryFilter() {
    return {};
  }
}

export = SingleObjectController;
