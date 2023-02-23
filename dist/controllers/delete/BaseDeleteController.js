"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SingleObjectController_1 = __importDefault(require("../generic/SingleObjectController"));
class BaseDeleteController extends SingleObjectController_1.default {
    constructor() {
        super(...arguments);
        // Query fields
        this.deleteOne = false;
    }
    getQueryResult() {
        let querySet;
        if (this.deleteOne) {
            const queryFilter = this.getQueryFilter();
            querySet = this.model.findOneAndDelete(queryFilter);
        }
        else {
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
module.exports = BaseDeleteController;
