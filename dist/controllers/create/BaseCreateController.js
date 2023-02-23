"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseController_1 = __importDefault(require("../generic/BaseController"));
class BaseCreateController extends BaseController_1.default {
    get validationResult() {
        if (this.validation) {
            return this.validation;
        }
        this.validation = this.validationSchema.validate(this.req);
        return this.validation;
    }
    getDocument() {
        return this.validationResult.getValue("body");
    }
    getQueryResult() {
        const document = this.getDocument();
        return this.model.create(document);
    }
}
module.exports = BaseCreateController;
