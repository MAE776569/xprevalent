"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseUpdateController_1 = __importDefault(require("./BaseUpdateController"));
class ApiUpdateController extends BaseUpdateController_1.default {
    handleRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.idParamIsInvalid() && !this.updateOne) {
                    return this.sendResponse({
                        success: false,
                        status: 404,
                        message: "Invalid id"
                    });
                }
                if (this.validationResult.hasError({ location: "body" })) {
                    return this.sendResponse({
                        success: false,
                        status: 422,
                        error: this.validationResult.getErrors({ location: "body" })
                    });
                }
                const queryResult = yield this.getQueryResult();
                if (!queryResult) {
                    return this.sendResponse({
                        success: false,
                        status: 404,
                        message: "Not found"
                    });
                }
                const contextObject = yield this.getContextObject();
                const resObject = Object.assign({}, contextObject);
                resObject[this.queryObjectName] = queryResult;
                return this.sendResponse({
                    body: resObject
                });
            }
            catch (err) {
                return this.next(err);
            }
        });
    }
}
module.exports = ApiUpdateController;
