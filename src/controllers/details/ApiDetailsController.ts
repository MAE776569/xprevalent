import BaseDetailsController from "./BaseDetailsController";

class ApiDetailsController extends BaseDetailsController {
  protected async handleRequest() {
    try {
      if (this.idParamIsInvalid() && !this.findOne) {
        return this.sendResponse({
          success: false,
          status: 404,
          message: "Invalid id"
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

export = ApiDetailsController;
