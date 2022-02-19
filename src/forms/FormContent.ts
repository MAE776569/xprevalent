import { Request } from "express";

class FormContent {
  protected req!: Request;
  private initials: { [key: string]: string } = {};
  private helperText: { [key: string]: string } = {};

  private getInitials() {
    return this.initials;
  }

  private getHelperText() {
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
