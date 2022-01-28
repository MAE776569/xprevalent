import BaseDeleteController from "./BaseDeleteController";

class ApiDeleteController extends BaseDeleteController {
  protected async handleRequest() {
    try {
      if (this.validateKeyParam() && !this.deleteOne) {
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

export = ApiDeleteController;
