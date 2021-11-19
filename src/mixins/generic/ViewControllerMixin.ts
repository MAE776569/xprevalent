import BaseController from "../../controllers/generic/BaseController";
import { Constructor } from "../../types/controllers/generic";

function ViewControllerMixin<T extends Constructor<BaseController>>(
  BaseClass: T
): T {
  return class ViewController extends BaseClass {
    // View template
    protected viewTemplate!: string;

    protected async handleRequest() {
      try {
        const contextObject = await this.getContextObject();
        const locals = { ...contextObject };
        if (this.model) {
          const queryResult = await this.getQueryResult();
          locals[this.queryObjectName] = queryResult;
        }
        return this.res.render(this.viewTemplate, locals);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ViewControllerMixin;
