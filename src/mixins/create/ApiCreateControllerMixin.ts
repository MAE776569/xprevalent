import BaseCreateController from "../../base/form/BaseCreateController";
import { Constructor } from "../../types/controllers/generic";

function ApiCreateControllerMixin<T extends Constructor<BaseCreateController>>(
  BaseClass: T
): T {
  return class ApiCreateController extends BaseClass {
    protected async handleRequest() {
      try {
        if (this.validationResult.hasError()) {
          return this.res
            .status(422)
            .json({ errors: this.validationResult.getErrors() });
        }

        const queryResult = await this.getQueryResult();
        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.res.status(201).json(resObject);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ApiCreateControllerMixin;
