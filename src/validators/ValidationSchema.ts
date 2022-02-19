import { Request } from "express";
import {
  SchemaValidation,
  ValidationObject,
  ValidationResultInput
} from "../types/validation/schema";
import ValidationResult from "./ValidationResult";

class ValidationSchema {
  private schema: SchemaValidation;
  private validationResult: ValidationResult;

  constructor(schema: SchemaValidation) {
    this.schema = schema;
    this.validationResult = new ValidationResult();
  }

  public validate(req: Request): ValidationObject {
    const locations: string[] = Object.keys(this.schema);

    locations.forEach((location: string) => {
      try {
        const value = this.schema[location].validateSync(req[location], {
          abortEarly: false
        });

        this.validationResult.addSanitizedValue({ [location]: value });
      } catch (validationError: any) {
        for (const error of validationError.inner) {
          this.validationResult.addError({
            [location]: { [error.path]: error.message }
          });
        }
      }
    });

    return {
      hasError: ({ name, location }: ValidationResultInput = {}) =>
        this.validationResult.hasError({ name, location }),
      getValue: (name?: string) => this.validationResult.getValue(name),
      getErrors: ({ name, location }: ValidationResultInput = {}) =>
        this.validationResult.getErrors({ name, location })
    };
  }
}

export = ValidationSchema;
