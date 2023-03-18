import { FillableObject } from "../types/controllers/generic";
import {
  ValidationErrors,
  ValidationResultInput
} from "../types/validation/schema";
import _ from "lodash";

class ValidationResult {
  private errors: ValidationErrors = {};
  private values: FillableObject = {};

  public addError(errorObject: FillableObject): void {
    this.errors = _.merge(this.errors, errorObject);
  }

  public addSanitizedValue(sanitizedObject: FillableObject): void {
    this.values = _.merge(this.values, sanitizedObject);
  }

  public hasError({ name, location }: ValidationResultInput): boolean {
    const errorsInLocation =
      (location ? this.errors[location] : this.errors) ?? {};
    if (name) {
      return Object.prototype.hasOwnProperty.call(errorsInLocation, name);
    }
    return Object.keys(errorsInLocation).length !== 0;
  }

  public getValue(name?: string): any {
    if (name) {
      return this.values[name];
    }
    return this.values;
  }

  public getErrors({
    name,
    location
  }: ValidationResultInput): ValidationErrors {
    const errorsInLocation = location ? this.errors[location] : this.errors;
    if (name) {
      return errorsInLocation[name];
    }
    return errorsInLocation;
  }
}

export = ValidationResult;
