import BaseController from "../generic/BaseController";

class FormViewController extends BaseController {
  // View template
  protected viewTemplate!: string;

  // Form data
  protected initials: { [key: string]: string } = {};
  protected helperText: { [key: string]: string } = {};

  protected getInitials() {
    return this.initials;
  }

  protected getHelperText() {
    return this.helperText;
  }

  protected async handleRequest() {
    try {
      const contextObject = await this.getContextObject();
      const initials = this.getInitials();
      const helperText = this.getHelperText();
      const resObject = { ...contextObject, initials, helperText };
      return this.res.render(this.viewTemplate, resObject);
    } catch (err) {
      return this.next(err);
    }
  }
}

export = FormViewController;
