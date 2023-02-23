import { Request } from "express";
import { SchemaValidation, ValidationObject } from "../types/validation/schema";
declare class ValidationSchema {
    private schema;
    private validationResult;
    constructor(schema: SchemaValidation);
    validate(req: Request): ValidationObject;
}
export = ValidationSchema;
