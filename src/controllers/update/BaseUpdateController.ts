import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import SingleObjectController from "../generic/SingleObjectController";

class BaseUpdateController extends SingleObjectController {
  // Model
  protected readonly model!: Model<Document>;

  // Query fields
  protected updateOne: boolean = false;
  protected upsert: boolean = false;

  protected getUpdateSet(): FillableObject {
    return this.validationResult.getValue("body");
  }

  protected getQueryResult() {
    let querySet;
    const updateSet = this.getUpdateSet();
    const options: FillableObject = { new: true };
    if (this.upsert) {
      options.upsert = this.upsert;
    }
    if (this.updateOne) {
      const queryFilter = this.getQueryFilter();
      querySet = this.model.findOneAndUpdate(queryFilter, updateSet, options);
    } else {
      const id = this.req.params[this.idParam];
      querySet = this.model.findByIdAndUpdate(id, updateSet, options);
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

export = BaseUpdateController;
