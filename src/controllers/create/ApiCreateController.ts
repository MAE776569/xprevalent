import BaseCreateController from "./BaseCreateController";

class ApiCreateController extends BaseCreateController {
  protected async handleRequest() {
    try {
      if (this.validationResult.hasError({ location: "body" })) {
        return this.res.status(422).json({
          errors: this.validationResult.getErrors({ location: "body" })
        });
      }

      const queryResult = await this.getQueryResult();
      const contextObject = await this.getContextObject();
      const resObject = { ...contextObject };
      resObject[this.queryObjectName] = queryResult;
      return this.res.status(201).json(resObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = ApiCreateController;