import { Model, Document } from "mongoose";
import { FillableObject } from "../../types/controllers/generic";
import SingleObjectController from "../generic/SingleObjectController";

class BaseEditController extends SingleObjectController {
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
      const id = this.req.params[this.keyParam];
      querySet = this.model.findByIdAndUpdate(id, updateSet, options);
    }
    if (this.populatedFields) {
      const populatedPaths = this.populatedFields.join(" ");
      querySet.populate(populatedPaths);
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

export = BaseEditController;
