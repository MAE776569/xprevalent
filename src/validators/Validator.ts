import {
  CustomValidator,
  StandardValidator
} from "../types/validation/validators";
import convertToString from "../utils/convertToString";
import { Request } from "express";

class Validator {
  private readonly validator: StandardValidator | CustomValidator;
  private readonly inverted: boolean;
  private readonly checkAll: boolean;
  private readonly options: any[] = [];
  private isCustom: boolean = false;

  constructor(
    validator: StandardValidator | CustomValidator,
    inverted: boolean = false,
    checkAll: boolean = false,
    options?: any[]
  ) {
    this.validator = validator;
    this.inverted = inverted;
    this.checkAll = checkAll;
    if (options) this.options = options;
  }

  public setCustom(): void {
    this.isCustom = true;
  }

  private validateAll(value: any, req: Request): boolean {
    let isValid = true;
    if (Array.isArray(value)) {
      value.forEach((el) => {
        if (this.isCustom) isValid = isValid && this.validator(el, req);
        else
          isValid =
            isValid && this.validator(convertToString(el), ...this.options);
      });
    }
    return isValid;
  }

  public run(value: any, req: Request): boolean {
    let isValid = true;
    if (this.checkAll) isValid = this.validateAll(value, req);
    else {
      if (this.isCustom) isValid = this.validator(value, req);
      else isValid = this.validator(convertToString(value), ...this.options);
    }
    return this.inverted ? !isValid : isValid;
  }
}

export = Validator;
