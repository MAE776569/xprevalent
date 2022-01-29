import FormViewControllerMixin from "../../mixins/form/FormViewControllerMixin";
import BaseEditController from "./BaseEditController";

class ViewEditController extends FormViewControllerMixin(BaseEditController) {
  async handleRequest() {
    try {
      if (this.validateKeyParam() && !this.updateOne) {
        return this.res.sendStatus(404);
      }

      const contextObject = await this.getContextObject();
      if (this.validationResult.hasError({ location: "body" })) {
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
}

export = ViewEditController;
