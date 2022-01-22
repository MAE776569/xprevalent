import { ViewFormControllerType } from "../../types/controllers/form";
import { Constructor } from "../../types/controllers/generic";
import FormControllerMixin from "../form/FormControllerMixin";

function ViewCreateControllerMixin<
  T extends Constructor<ViewFormControllerType>
>(BaseClass: T) {
  return class ViewCreateController extends FormControllerMixin(BaseClass) {
    async handleRequest() {
      try {
        const contextObject = await this.getContextObject();
        if (this.validationResult.hasError({ location: "body" })) {
          return this.formInvalid(contextObject);
        }

        const queryResult = await this.getQueryResult();
        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.formValid(resObject);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ViewCreateControllerMixin;
