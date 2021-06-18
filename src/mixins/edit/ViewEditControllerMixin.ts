import { ViewFormControllerType } from "../../types/controllers/form";
import { Constructor } from "../../types/controllers/generic";
import FormControllerMixin from "../form/FormControllerMixin";

function ViewEditControllerMixin<T extends Constructor<ViewFormControllerType>>(
  BaseClass: T
) {
  return class ViewEditController extends FormControllerMixin(BaseClass) {
    async handleRequest() {
      try {
        if (this.validateKeyParam() && !this.updateOne) {
          return this.res.sendStatus(404);
        }

        const contextObject = await this.getContextObject();
        if (this.validationResult.hasError()) {
          return this.formInvalid(contextObject);
        }

        const queryResult = await this.getQueryResult();
        if (!queryResult) {
          return this.res.sendStatus(404);
        }

        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.formValid(resObject);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ViewEditControllerMixin;
