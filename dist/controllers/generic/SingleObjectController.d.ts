import { ValidationObject } from "../../types/validation/schema";
import { ValidationSchema } from "../../validator";
import BaseController from "./BaseController";
declare class SingleObjectController extends BaseController {
    protected idParam: string;
    protected validationSchema: ValidationSchema;
    private validation;
    protected get validationResult(): ValidationObject;
    protected idParamIsInvalid(): boolean;
    protected getQueryFilter(): {};
}
export = SingleObjectController;
