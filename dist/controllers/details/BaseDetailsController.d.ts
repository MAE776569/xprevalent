import { Model, Document } from "mongoose";
import SingleObjectController from "../generic/SingleObjectController";
declare class BaseDetailsController extends SingleObjectController {
    protected readonly model: Model<Document>;
    protected findOne: boolean;
    protected getQueryResult(): any;
}
export = BaseDetailsController;
