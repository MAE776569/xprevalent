"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const lodash_1 = __importDefault(require("lodash"));
class ValidationResult {
    constructor() {
        this.errors = {};
        this.values = {};
    }
    addError(errorObject) {
        this.errors = lodash_1.default.merge(this.errors, errorObject);
    }
    addSanitizedValue(sanitizedObject) {
        this.values = lodash_1.default.merge(this.values, sanitizedObject);
    }
    hasError({ name, location }) {
        var _a;
        const errorsInLocation = (_a = (location ? this.errors[location] : this.errors)) !== null && _a !== void 0 ? _a : {};
        if (name) {
            return Object.prototype.hasOwnProperty.call(errorsInLocation, name);
        }
        return Object.keys(errorsInLocation).length !== 0;
    }
    getValue(name) {
        if (name) {
            return this.values[name];
        }
        return this.values;
    }
    getErrors({ name, location }) {
        var _a;
        const errorsInLocation = (_a = (location ? this.errors[location] : this.errors)) !== null && _a !== void 0 ? _a : {};
        if (name) {
            return errorsInLocation[name];
        }
        return errorsInLocation;
    }
}
module.exports = ValidationResult;
