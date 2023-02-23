"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SingleObjectController_1 = __importDefault(require("../generic/SingleObjectController"));
class BaseUpdateController extends SingleObjectController_1.default {
    constructor() {
        super(...arguments);
        // Query fields
        this.updateOne = false;
        this.upsert = false;
    }
    getUpdateSet() {
        return this.validationResult.getValue("body");
    }
    getQueryResult() {
        let querySet;
        const updateSet = this.getUpdateSet();
        const options = { new: true };
        if (this.upsert) {
            options.upsert = this.upsert;
        }
        if (this.updateOne) {
            const queryFilter = this.getQueryFilter();
            querySet = this.model.findOneAndUpdate(queryFilter, updateSet, options);
        }
        else {
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
        }
        else if (this.excludedFields) {
            const excludedPaths = this.excludedFields
                .map((item) => `-${item}`)
                .join(" ");
            querySet.select(excludedPaths);
        }
        return querySet;
    }
}
module.exports = BaseUpdateController;
