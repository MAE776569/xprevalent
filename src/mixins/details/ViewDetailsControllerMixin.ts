import BaseDetailsController from "../../controllers/generic/BaseDetailsController";
import { Constructor } from "../../types/controllers/generic";

function ViewDetailsControllerMixin<
  T extends Constructor<BaseDetailsController>
>(BaseClass: T): T {
  return class ViewDetailsController extends BaseClass {
    // View template
    protected viewTemplate!: string;

    protected async handleRequest() {
      try {
        if (this.validateKeyParam() && !this.findOne) {
          return this.res.sendStatus(404);
        }

        const queryResult = await this.getQueryResult();
        if (!queryResult) {
          return this.res.sendStatus(404);
        }

        const contextObject = await this.getContextObject();
        const locals = { ...contextObject };
        locals[this.queryObjectName] = queryResult;
        return this.res.render(this.viewTemplate, locals);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ViewDetailsControllerMixin;
