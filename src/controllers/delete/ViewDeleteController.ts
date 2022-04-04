import FormViewControllerMixin from "../../mixins/form/FormViewControllerMixin";
import BaseDeleteController from "./BaseDeleteController";

class ViewDeleteController extends FormViewControllerMixin(
  BaseDeleteController
) {
  async handleRequest() {
    try {
      if (this.validateIdParam() && !this.deleteOne) {
        return this.sendResponse({
          type: "html",
          success: false,
          status: 404,
          message: "Not Found"
        });
      }

      const queryResult = await this.getQueryResult();
      if (!queryResult) {
        return this.sendResponse({
          type: "html",
          success: false,
          status: 404,
          message: "Not Found"
        });
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
