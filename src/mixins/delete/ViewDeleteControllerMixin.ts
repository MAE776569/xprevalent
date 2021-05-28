import { ViewFormControllerType } from "../../types/controllers/form";
import { Constructor } from "../../types/controllers/generic";
import FormControllerMixin from "../form/FormControllerMixin";

function ViewDeleteControllerMixin<
  T extends Constructor<ViewFormControllerType>
>(BaseClass: T) {
  return class ViewDeleteController extends FormControllerMixin(BaseClass) {
    async handleRequest() {
      try {
        const validationResult = this.validationSchema.validate(this.req);
        if (validationResult.hasError(this.keyParam) && !this.deleteOne) {
          return this.res.sendStatus(404);
        }

        const queryResult = await this.getQueryResult();
        if (!queryResult) {
          return this.res.sendStatus(404);
        }

        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.formValid(resObject);
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = ViewDeleteControllerMixin;
