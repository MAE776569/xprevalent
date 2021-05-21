import { ViewFormControllerType } from "../../types/controllers/form";
import { Constructor } from "../../types/controllers/generic";
import FormControllerMixin from "../form/FormControllerMixin";

function ViewCreateControllerMixin<
  T extends Constructor<ViewFormControllerType>
>(BaseClass: T) {
  return class ViewCreateController extends FormControllerMixin(BaseClass) {
    async handleRequest() {
      try {
        if (this.validationResult.hasError()) return this.formInvalid();

        const queryResult = await this.getQueryResult();
        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.formValid();
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ViewCreateControllerMixin;
