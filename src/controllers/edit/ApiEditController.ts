import BaseEditController from "./BaseEditController";

class ApiEditController extends BaseEditController {
  protected async handleRequest() {
    try {
      if (this.validateIdParam() && !this.updateOne) {
        return this.res.status(404).json({ message: "Invalid id" });
      }

      if (this.validationResult.hasError({ location: "body" })) {
        return this.res.status(422).json({
          errors: this.validationResult.getErrors({ location: "body" })
        });
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

export = ApiEditController;
