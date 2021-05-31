import { Constructor, FillableObject } from "../../types/controllers/generic";
import { ViewFormControllerType } from "../../types/controllers/form";
import BaseController from "../../base/generic/BaseController";
import { ValidationObject } from "../../types/validation/schema";

function FormControllerMixin<T extends Constructor<BaseController>>(
  BaseClass: T
) {
  class FormController extends BaseClass {
    protected viewTemplate!: string;
    // Redirect urls
    protected successUrl?: string;
    protected validationResult!: ValidationObject;

    protected getSuccessUrl(): string {
      return typeof this.successUrl === "string" && this.successUrl.length !== 0
        ? this.successUrl
        : this.req.originalUrl;
    }

    protected formValid(): void {
      const successUrl = this.getSuccessUrl();
      return this.res.redirect(successUrl);
    }

    protected formInvalid(contextObject: FillableObject): void {
      const errors = this.validationResult.getErrors();
      return this.res.render(this.viewTemplate, { errors, ...contextObject });
    }
  }

  return FormController as ViewFormControllerType;
}

export = FormControllerMixin;
