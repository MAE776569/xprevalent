import BaseEditController from "../../base/form/BaseEditController";
import { Constructor } from "../../types/controllers/generic";

function ApiEditControllerMixin<T extends Constructor<BaseEditController>>(
  BaseClass: T
): T {
  return class ApiEditController extends BaseClass {
    protected async handleRequest() {
      try {
        if (this.validateKeyParam() && !this.updateOne) {
          return this.res.status(404).json({ message: "Invalid id" });
        }

        if (this.validationResult.hasError()) {
          return this.res
            .status(422)
            .json({ errors: this.validationResult.getErrors() });
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

export = ApiEditControllerMixin;
