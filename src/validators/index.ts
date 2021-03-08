import createValidator from "./createValidator";
import ValidationSchema from "./ValidationSchema";

export const validateBody = (message?: string) =>
  createValidator("body", message);
export const validateParam = (message?: string) =>
  createValidator("params", message);
export const validateQuery = (message?: string) =>
  createValidator("query", message);

export { ValidationSchema };
