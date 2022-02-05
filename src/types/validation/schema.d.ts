/* eslint-disable no-unused-vars */
import { FillableObject } from "../controllers/generic";
import { AnyObjectSchema } from "yup";
import ValidationResult from "../../validators/ValidationResult";

export interface ValidationErrors extends FillableObject, Object {}

export interface SchemaValidation {
  body?: AnyObjectSchema;
  params?: AnyObjectSchema;
  query?: AnyObjectSchema;
}

export interface ValidationObject {
  hasError: (validationResultInput?: ValidationResultInput) => boolean;
  getValue: (name?: string) => any;
  getErrors: (
    validationResultInput?: ValidationResultInput
  ) => ValidationErrors;
}

export type ValidationLocation = "body" | "params" | "query";
export interface ValidationResultInput {
  name?: string;
  location?: ValidationLocation;
}
