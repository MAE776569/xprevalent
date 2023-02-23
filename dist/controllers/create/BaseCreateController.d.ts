import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import { ValidationObject } from "../../types/validation/schema";
import { ValidationSchema } from "../../validator";
import BaseController from "../generic/BaseController";
declare class BaseCreateController extends BaseController {
    protected readonly model: Model<Document>;
    protected validationSchema: ValidationSchema;
    private validation;
    protected get validationResult(): ValidationObject;
    protected getDocument(): FillableObject;
    protected getQueryResult(): Promise<Document>;
}
export = BaseCreateController;
