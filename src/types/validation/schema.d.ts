import ValidationChain from "../../validators/ValidationChain";
import ValidationResult from "../../validators/ValidationResult";

/* eslint-disable no-unused-vars */
export type PipelineRunner = ({
  req,
  keys,
  validationResult
}: {
  req: Request;
  keys: string[];
  validationResult: ValidationResult;
}) => void;

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
