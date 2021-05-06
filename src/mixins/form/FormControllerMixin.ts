import BaseController from "../../base/generic/BaseController";
import { ValidationObject } from "../../types/validation/schema";
import { Constructor } from "../../types/controllers/generic";

function FormControllerMixin<T extends Constructor<BaseController>>(
  BaseClass: T
): T {
  return class FormController extends BaseClass {
    protected viewTemplate!: string;
    // Redirect urls
    protected successUrl: string;
    protected validationResult!: ValidationObject;

    constructor(...params: any[]) {
      super(...params);
      this.successUrl = this.getSuccessUrl();
    }

    protected getSuccessUrl(): string {
      return typeof this.successUrl === "string" && this.successUrl.length !== 0
        ? this.successUrl
        : this.req.originalUrl;
    }

    protected formValid(): void {
      return this.res.redirect(this.successUrl);
    }

    protected formInvalid(): void {
      const errors = this.validationResult.getErrors();
      return this.res.render(this.viewTemplate, { errors });
    }

    protected async handleRequest() {
      try {
        if (this.validationResult.hasError()) return this.formInvalid();

        const queryResult = await this.getQueryResult();
        const contextObject = await this.getContextObject();
        const resObject = { ...contextObject };
        resObject[this.queryObjectName] = queryResult;
        return this.formValid();
      } catch (err) {
        return this.next(err);
      }
    }
  };
}

export = FormControllerMixin;
