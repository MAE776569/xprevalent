import BaseDetailsController from "../../base/BaseDetailsController";
import { Constructor } from "../../types/controllers/base";

function ApiDetailsControllerMixin<
  T extends Constructor<BaseDetailsController>
>(BaseClass: T): T {
  return class ApiDetailsController extends BaseClass {
    protected async handleRequest() {
      try {
        const validationResult = this.validationSchema.validate(this.req);
        if (validationResult.hasError(this.keyParam) && !this.findOne)
          return this.res.status(404).json({ message: "Invalid id" });

        const queryResult = await this.getQueryResult();
        if (!queryResult)
          return this.res.status(404).json({ message: "Not found" });

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
