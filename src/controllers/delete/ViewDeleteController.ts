import FormViewControllerMixin from "../../mixins/form/FormViewControllerMixin";
import BaseDeleteController from "./BaseDeleteController";

class ViewDeleteController extends FormViewControllerMixin(
  BaseDeleteController
) {
  async handleRequest() {
    try {
      if (this.validateKeyParam() && !this.deleteOne) {
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
}

export = ViewDeleteController;
