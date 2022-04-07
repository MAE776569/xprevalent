import BaseCreateController from "./BaseCreateController";

class ApiCreateController extends BaseCreateController {
  protected async handleRequest() {
    try {
      if (this.validationResult.hasError({ location: "body" })) {
        return this.sendResponse({
          status: 422,
          error: this.validationResult.getErrors({ location: "body" })
        });
      }

      const queryResult = await this.getQueryResult();
      const contextObject = await this.getContextObject();
      const resObject = { ...contextObject };
      resObject[this.queryObjectName] = queryResult;
      return this.sendResponse({
        status: 201,
        body: resObject
      });
    } catch (err) {
      return this.next(err);
    }
  }
}

export = ApiCreateController;
