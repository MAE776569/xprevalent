import BaseDetailsController from "./BaseDetailsController";

class ViewDetailsController extends BaseDetailsController {
  // View template
  protected viewTemplate!: string;

  protected async handleRequest() {
    try {
      if (this.validateIdParam() && !this.findOne) {
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
      const locals = { ...contextObject };
      locals[this.queryObjectName] = queryResult;
      return this.sendResponse({
        type: "html",
        body: locals
      });
    } catch (err) {
      return this.next(err);
    }
  }
}

export = ViewDetailsController;
