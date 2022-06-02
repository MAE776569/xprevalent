import { Model, Document } from "mongoose";
import SingleObjectController from "../generic/SingleObjectController";

class BaseDeleteController extends SingleObjectController {
  // Model
  protected readonly model!: Model<Document>;

  // Query fields
  protected deleteOne: boolean = false;

  protected getQueryResult() {
    let querySet;
    if (this.deleteOne) {
      const queryFilter = this.getQueryFilter();
      querySet = this.model.findOneAndDelete(queryFilter);
    } else {
      const id = this.req.params[this.idParam];
      querySet = this.model.findByIdAndDelete(id);
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
    return querySet.exec();
  }
}

export = BaseDeleteController;
