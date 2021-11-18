import { Request } from "express";
import { SchemaValidation, ValidationObject } from "../types/validation/schema";
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
        this.validationResult.addSanitizedValue(value);
      } catch (validationError: any) {
        for (const error of validationError.inner) {
          this.validationResult.addError({ [error.path]: error.message });
        }
      }
    });
    return {
      hasError: (name?: string) => this.validationResult.hasError(name),
      getSanitizedValue: (name?: string) =>
        this.validationResult.getSanitizedValue(name),
      getErrors: () => this.validationResult.getErrors()
    };
  }
}

export = ValidationSchema;
