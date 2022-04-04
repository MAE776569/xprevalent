import BaseDeleteController from "./BaseDeleteController";

class ApiDeleteController extends BaseDeleteController {
  protected async handleRequest() {
    try {
      if (this.validateIdParam() && !this.deleteOne) {
        return this.sendResponse({
          success: false,
          status: 404,
          message: "Invalid id",
          error: {}
        });
      }

      const queryResult = await this.getQueryResult();
      if (!queryResult) {
        return this.sendResponse({
          success: false,
          status: 404,
          message: "Not found",
          error: {}
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

export = ApiDeleteController;
