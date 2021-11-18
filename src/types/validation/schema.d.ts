/* eslint-disable no-unused-vars */
import { FillableObject } from "../controllers/generic";
import { AnyObjectSchema } from "yup";

export interface ValidationErrors extends FillableObject, Object {}

interface SchemaValidation {
  body?: AnyObjectSchema;
  params?: AnyObjectSchema;
  query?: AnyObjectSchema;
}

export interface ValidationObject {
  hasError: (name?: string) => boolean;
  getSanitizedValue: (name?: string) => any;
  getErrors: () => ValidationErrors;
}
