import BaseController from "../generic/BaseController";
import FormContent from "../../forms/FormContent";

class FormViewController extends BaseController {
  // View template
  protected viewTemplate!: string;

  // Form content
  protected formContent!: FormContent;

  protected async handleRequest() {
    try {
      const contextObject = await this.getContextObject();
      const { initials, helperText } = this.formContent.getFormData(this.req);
      const resObject = { ...contextObject, initials, helperText };
      return this.res.render(this.viewTemplate, resObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = FormViewController;
