import { FillableObject } from "../types/controllers/generic";
import { ValidationErrors } from "../types/validation/schema";
import * as _ from "lodash";

class ValidationResult {
  private errors: ValidationErrors = {};
  private sanitizedValues: FillableObject = {};

  public addError(errorObject: FillableObject): void {
    this.errors = _.merge(this.errors, errorObject);
  }

  public addSanitizedValue(sanitizedObject: FillableObject): void {
    this.sanitizedValues = _.merge(this.sanitizedValues, sanitizedObject);
  }

  public hasError(name?: string): boolean {
    if (name) {
      return Object.prototype.hasOwnProperty.call(this.errors, name);
    }
    return Object.keys(this.errors).length !== 0;
  }

  public getSanitizedValue(name?: string): any {
    if (name) {
      return this.sanitizedValues[name];
    }
    return this.sanitizedValues;
  }

  public getErrors(): ValidationErrors {
    return this.errors;
  }
}

export = ValidationResult;
