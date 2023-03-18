import BaseUpdateController from "./BaseUpdateController";

class ApiUpdateController extends BaseUpdateController {
  protected async handleRequest() {
    try {
      if (this.idParamIsInvalid() && !this.updateOne) {
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
        body: resObject
      });
    } catch (err) {
      return this.next(err);
    }
  }
}

export = ApiUpdateController;
