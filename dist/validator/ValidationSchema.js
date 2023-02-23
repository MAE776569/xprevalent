"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ValidationResult_1 = __importDefault(require("./ValidationResult"));
class ValidationSchema {
    constructor(schema) {
        this.schema = schema;
        this.validationResult = new ValidationResult_1.default();
    }
    validate(req) {
        const locations = Object.keys(this.schema);
        locations.forEach((location) => {
            try {
                const value = this.schema[location].validateSync(req[location], {
                    abortEarly: false
                });
                this.validationResult.addSanitizedValue({ [location]: value });
            }
            catch (validationError) {
                for (const error of validationError.inner) {
                    this.validationResult.addError({
                        [location]: { [error.path]: error.message }
                    });
                }
            }
        });
        return {
            hasError: ({ name, location } = {}) => this.validationResult.hasError({ name, location }),
            getValue: (name) => this.validationResult.getValue(name),
            getErrors: ({ name, location } = {}) => this.validationResult.getErrors({ name, location })
        };
    }
}
module.exports = ValidationSchema;
