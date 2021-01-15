import BaseController from "../base/BaseController";
import { Constructor } from "../types/base";

function ApiControllerMixin<T extends Constructor<BaseController>>(
  BaseClass: T
): T {
  return class ApiController extends BaseClass {
    // Query result object name
    protected queryObjectName!: string;

    protected async handleRequest() {
      try {
        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        if (this.model) {
          const queryResult = await this.getQueryResult();
          resObject[this.queryObjectName] = queryResult;
        }
        return this.res.json(resObject);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ApiControllerMixin;
