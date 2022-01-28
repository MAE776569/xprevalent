import FormControllerMixin from "../../mixins/form/FormControllerMixin";
import BaseDeleteController from "./BaseDeleteController";

class ViewDeleteController extends FormControllerMixin(BaseDeleteController) {
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
