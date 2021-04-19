import ValidationChain from "../../validators/ValidationChain";
import ValidationResult from "../../validators/ValidationResult";
import { Request } from "express";
import { FillableObject } from "../controllers/base";

export interface ValidationInput {
  req: Request;
  keys: string[];
  validationResult: ValidationResult;
}

/* eslint-disable no-unused-vars */
export type PipelineRunner = ({
  req,
  keys,
  validationResult
}: ValidationInput) => void;

export type Chain = PipelineRunner | ValidationChain<Chain>;
export interface SchemaObject {
  [key: string]: PipelineRunner | SchemaObject;
}
export interface ValidationErrors extends FillableObject, Object {}

export interface ValidationObject {
  hasError: (name?: string) => boolean;
  getSanitizedValue: (name?: string) => any;
  getErrors: () => ValidationErrors;
}

export interface BaseValidation {
  validate:
    | ((req: Request) => ValidationObject)
    | (({ req, keys, validationResult }: ValidationInput) => void);
}

export interface ArraySchemaOptions {
  length?: number;
  minLength?: number;
  maxLength?: number;
}
