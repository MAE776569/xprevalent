"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const yup = __importStar(require("yup"));
const validator_1 = __importDefault(require("validator"));
const convertToString_1 = __importDefault(require("../utils/convertToString"));
const validators_1 = __importDefault(require("./validators"));
const sanitizers_1 = __importDefault(require("./sanitizers"));
validators_1.default.forEach((method) => {
    yup.addMethod(yup[method.schema], method.name, function (...options) {
        return this.test(method.validatorName, undefined, function (value) {
            const isValid = validator_1.default[method.validatorName](convertToString_1.default(value), ...options);
            return isValid;
        });
    });
});
sanitizers_1.default.forEach((method) => {
    yup.addMethod(yup[method.schema], method.name, function (...options) {
        return this.transform(function (value) {
            return validator_1.default[method.validatorName](convertToString_1.default(value), ...options);
        });
    });
});
module.exports = yup;
