import { FillableObject } from "../types/controllers/generic";
import { ValidationErrors, ValidationResultInput } from "../types/validation/schema";
declare class ValidationResult {
    private errors;
    private values;
    addError(errorObject: FillableObject): void;
    addSanitizedValue(sanitizedObject: FillableObject): void;
    hasError({ name, location }: ValidationResultInput): boolean;
    getValue(name?: string): any;
    getErrors({ name, location }: ValidationResultInput): ValidationErrors;
}
export = ValidationResult;
