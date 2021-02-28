import { Request } from "express";
import {
  BaseValidation,
  SchemaObject,
  ValidationObject
} from "../types/validation/schema";
import ArraySchema from "./ArraySchema";
import ValidationResult from "./ValidationResult";
class ValidationSchema implements BaseValidation {
  private schema: SchemaObject;
  private validationResult: ValidationResult;

  constructor(schema: SchemaObject) {
    this.schema = schema;
    this.validationResult = new ValidationResult();
  }

  public validate(req: Request): ValidationObject {
    this.runValidation(this.schema, req);
    return {
      hasError: (name?: string) => this.validationResult.hasError(name),
      getSanitizedValue: (name?: string) =>
        this.validationResult.getSanitizedValue(name),
      getErrors: () => this.validationResult.getErrors()
    };
  }

  private runValidation(
    deepSchema: SchemaObject | ArraySchema,
    req: Request,
    keys: string[] = []
  ): void {
    const validationKeys = Object.keys(deepSchema);
    validationKeys.forEach((item) => {
      const validationFunc = deepSchema[item];

      // if array schema run its own validation
      if (validationFunc instanceof ArraySchema) {
        validationFunc.validate({
          req,
          keys: [...keys, item],
          validationResult: this.validationResult
        });
      }

      // if object, run deep validation
      else if (typeof validationFunc === "object") {
        this.runValidation(validationFunc, req, [...keys, item]);
      }

      // else run validation function
      else {
        validationFunc({
          req,
          keys: [...keys, item],
          validationResult: this.validationResult
        });
      }
    });
  }
}

export = ValidationSchema;
