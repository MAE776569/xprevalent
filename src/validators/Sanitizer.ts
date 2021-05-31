import {
  CustomSanitizer,
  StandardSanitizer
} from "../types/validation/sanitizers";

class Sanitizer {
  private readonly sanitizer: StandardSanitizer | CustomSanitizer;
  private readonly options: any[] = [];

  constructor(sanitizer: StandardSanitizer | CustomSanitizer, options?: any[]) {
    this.sanitizer = sanitizer;
    if (options) {
      this.options = options;
    }
  }

  public run(value: any): any {
    return this.sanitizer(value, ...this.options);
  }
}

export = Sanitizer;
