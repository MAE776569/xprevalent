"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.ValidationSchema = exports.ApiDeleteController = exports.ApiUpdateController = exports.ApiCreateController = exports.ApiDetailsController = exports.ApiListController = exports.ApiController = void 0;
const BaseController_1 = __importDefault(require("./controllers/generic/BaseController"));
const BaseListController_1 = __importDefault(require("./controllers/list/BaseListController"));
const ApiControllerMixin_1 = __importDefault(require("./mixins/ApiControllerMixin"));
const ApiDetailsController_1 = __importDefault(require("./controllers/details/ApiDetailsController"));
exports.ApiDetailsController = ApiDetailsController_1.default;
const ApiCreateController_1 = __importDefault(require("./controllers/create/ApiCreateController"));
exports.ApiCreateController = ApiCreateController_1.default;
const ApiUpdateController_1 = __importDefault(require("./controllers/update/ApiUpdateController"));
exports.ApiUpdateController = ApiUpdateController_1.default;
const ApiDeleteController_1 = __importDefault(require("./controllers/delete/ApiDeleteController"));
exports.ApiDeleteController = ApiDeleteController_1.default;
const validator_1 = require("./validator");
Object.defineProperty(exports, "ValidationSchema", { enumerable: true, get: function () { return validator_1.ValidationSchema; } });
Object.defineProperty(exports, "schema", { enumerable: true, get: function () { return validator_1.schema; } });
exports.ApiController = ApiControllerMixin_1.default(BaseController_1.default);
exports.ApiListController = ApiControllerMixin_1.default(BaseListController_1.default);
