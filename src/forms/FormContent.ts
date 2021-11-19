import { Request } from "express";

class FormContent {
  protected req!: Request;
  private initials: { [key: string]: string } = {};
  private helperText: { [key: string]: string } = {};

  public setRequest(req: Request) {
    this.req = req;
  }

  public getInitials() {
    return this.initials;
  }

  public getHelperText() {
    return this.helperText;
  }
}

export = FormContent;
