import { Constructor, FillableObject } from "../../types/controllers/generic";
import { ViewFormControllerType } from "../../types/controllers/form";
import BaseController from "../../controllers/generic/BaseController";
import { ValidationObject } from "../../types/validation/schema";
import FormContent from "../../forms/FormContent";

function FormViewControllerMixin<T extends Constructor<BaseController>>(
  BaseClass: T
) {
  class FormController extends BaseClass {
    protected viewTemplate!: string;
    // Redirect urls
    protected successUrl?: string;
    protected validationResult!: ValidationObject;

    // Form content
    protected formContent!: FormContent;

    protected getSuccessUrl(): string {
      return typeof this.successUrl === "string" && this.successUrl.length !== 0
        ? this.successUrl
        : this.req.originalUrl;
    }

    protected formValid(): void {
      const successUrl = this.getSuccessUrl();
      return this.res.redirect(successUrl);
    }

    protected formInvalid(contextObject: FillableObject) {
      const { initials, helperText } = this.formContent.getFormData(this.req);
      const errors = this.validationResult.getErrors({ location: "body" });
      return this.sendResponse({
        type: "html",
        data: {
          errors,
          initials,
          helperText,
          ...contextObject
        }
      });
    }
  }

  return FormController as ViewFormControllerType;
}

export = FormViewControllerMixin;
