import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import SingleObjectController from "../generic/SingleObjectController";
declare class BaseUpdateController extends SingleObjectController {
    protected readonly model: Model<Document>;
    protected updateOne: boolean;
    protected upsert: boolean;
    protected getUpdateSet(): FillableObject;
    protected getQueryResult(): any;
}
export = BaseUpdateController;
