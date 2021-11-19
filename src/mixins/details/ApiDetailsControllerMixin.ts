import BaseDetailsController from "../../controllers/generic/BaseDetailsController";
import { Constructor } from "../../types/controllers/generic";

function ApiDetailsControllerMixin<
  T extends Constructor<BaseDetailsController>
>(BaseClass: T): T {
  return class ApiDetailsController extends BaseClass {
    protected async handleRequest() {
      try {
        if (this.validateKeyParam() && !this.findOne) {
          return this.res.status(404).json({ message: "Invalid id" });
        }

        const queryResult = await this.getQueryResult();
        if (!queryResult) {
          return this.res.status(404).json({ message: "Not found" });
        }

        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.res.json(resObject);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ApiDetailsControllerMixin;
