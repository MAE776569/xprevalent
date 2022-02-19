import BaseDetailsController from "./BaseDetailsController";

class ApiDetailsController extends BaseDetailsController {
  protected async handleRequest() {
    try {
      if (this.validateIdParam() && !this.findOne) {
        return this.res.status(404).json({ message: "Invalid id" });
      }

      const queryResult = await this.getQueryResult();
      if (!queryResult) {
        return this.res.status(404).json({ message: "Not found" });
      }

      const contextObject = await this.getContextObject();
      const resObject = { ...contextObject };
      resObject[this.queryObjectName] = queryResult;
      return this.res.json(resObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = ApiDetailsController;
