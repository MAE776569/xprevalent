import BaseController from "../../controllers/generic/BaseController";
import { Constructor } from "../../types/controllers/generic";

function ApiControllerMixin<T extends Constructor<BaseController>>(
  BaseClass: T
): T {
  return class ApiController extends BaseClass {
    protected async handleRequest() {
      try {
        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        if (this.model) {
          const queryResult = await this.getQueryResult();
          resObject[this.queryObjectName] = queryResult;
        }
        return this.sendResponse({
          body: resObject
        });
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ApiControllerMixin;
