import BaseController from "../controllers/generic/BaseController";
import { Constructor } from "../types/controllers/generic";
declare function ApiControllerMixin<T extends Constructor<BaseController>>(BaseClass: T): T;
export = ApiControllerMixin;
