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

  protected validateIdParam(): boolean {
    const validationSchema = new ValidationSchema({
      params: schema.object({
        [this.idParam]: schema.string().mongoId()
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
