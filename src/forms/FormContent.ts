import { Request } from "express";

class FormContent {
  protected req!: Request;
  protected initials: { [key: string]: string } = {};
  protected helperText: { [key: string]: string } = {};

  protected getInitials() {
    return this.initials;
  }

  protected getHelperText() {
    return this.helperText;
  }

  public getFormData(req: Request) {
    this.req = req;
    const initials = this.getInitials();
    const helperText = this.getHelperText();
    return {
      initials,
      helperText
    };
  }
}

export = FormContent;
