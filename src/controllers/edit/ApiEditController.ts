import BaseEditController from "./BaseEditController";

class ApiEditController extends BaseEditController {
  protected async handleRequest() {
    try {
      if (this.validateIdParam() && !this.updateOne) {
        return this.sendResponse({
          success: false,
          status: 404,
          message: "Invalid id"
        });
      }

      if (this.validationResult.hasError({ location: "body" })) {
        return this.sendResponse({
          success: false,
          status: 422,
          error: this.validationResult.getErrors({ location: "body" })
        });
      }

      const queryResult = await this.getQueryResult();
      if (!queryResult) {
        return this.sendResponse({
          success: false,
          status: 404,
          message: "Not found"
        });
      }

      const contextObject = await this.getContextObject();
      const resObject = { ...contextObject };
      resObject[this.queryObjectName] = queryResult;
      return this.sendResponse({
        data: resObject
      });
    } catch (err) {
      return this.next(err);
    }
  }
}

export = ApiEditController;
