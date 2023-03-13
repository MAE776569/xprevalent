import { ValidationObject } from "../../types/validation/schema";
import { schema, ValidationSchema } from "../../validator";
import BaseController from "./BaseController";

class SingleObjectController extends BaseController {
  // Params and validation
  protected idParam: string = "id";
  protected validationSchema!: ValidationSchema;
  private validation!: ValidationObject;

  protected get validationResult(): ValidationObject {
    if (this.validation) {
      return this.validation;
    }
    this.validation = this.validationSchema.validate(this.req);
    return this.validation;
  }

  protected idParamIsInvalid(): boolean {
    const validationSchema = new ValidationSchema({
      params: schema.object({
        [this.idParam]: schema
          .string()
          .matches(/^(0x|0h)?[0-9A-F]+$/i)
          .length(24)
          .required()
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
