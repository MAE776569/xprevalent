import { Model, Document } from "mongoose";
import SingleObjectController from "../generic/SingleObjectController";

class BaseDetailsController extends SingleObjectController {
  // Model
  protected readonly model!: Model<Document>;

  // Query fields
  protected findOne: boolean = false;

  protected getQueryResult() {
    let querySet;
    if (this.findOne) {
      const queryFilter = this.getQueryFilter();
      querySet = this.model.findOne(queryFilter);
    } else {
      const id = this.req.params[this.idParam];
      querySet = this.model.findById(id);
    }
    if (this.populatedFields) {
      querySet.populate(this.populatedFields);
    }
    if (this.sortBy) {
      querySet.sort(this.sortBy);
    }
    if (this.selectedFields) {
      querySet.select(this.selectedFields);
    } else if (this.excludedFields) {
      const excludedPaths = this.excludedFields
        .map((item) => `-${item}`)
        .join(" ");
      querySet.select(excludedPaths);
    }
    return querySet;
  }
}

export = BaseDetailsController;
