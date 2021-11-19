import BaseController from "../generic/BaseController";
import FormContent from "../../forms/FormContent";

class FormViewController extends BaseController {
  // View template
  protected viewTemplate!: string;

  // Form content
  protected formContent!: FormContent;

  protected async handleRequest() {
    try {
      this.formContent.setRequest(this.req);
      const contextObject = await this.getContextObject();
      const initials = this.formContent.getInitials();
      const helperText = this.formContent.getHelperText();
      const resObject = { ...contextObject, initials, helperText };
      return this.res.render(this.viewTemplate, resObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = FormViewController;
