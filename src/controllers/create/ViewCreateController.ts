import FormControllerMixin from "../../mixins/form/FormControllerMixin";
import BaseDetailsController from "../details/BaseDetailsController";

class ViewCreateController extends FormControllerMixin(BaseDetailsController) {
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
}

export = ViewCreateController;
