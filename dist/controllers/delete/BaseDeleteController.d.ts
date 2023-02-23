import { Model, Document } from "mongoose";
import SingleObjectController from "../generic/SingleObjectController";
declare class BaseDeleteController extends SingleObjectController {
    protected readonly model: Model<Document>;
    protected deleteOne: boolean;
    protected getQueryResult(): any;
}
export = BaseDeleteController;
