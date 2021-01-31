/* eslint-disable no-unused-vars */
import * as Options from "./options";

type CustomSanitizer = (input: any) => any;
export type StandardSanitizer = (input: string, ...options: any[]) => any;

export interface Sanitizers<T> {
  // custom sanitizers
  customSanitizer(sanitizer: CustomSanitizer): T;
  default(default_value: any): T;
  replace(values_to_replace: any, new_value: any): T;

  // validator's sanitizers
  blacklist(chars: string): T;
  escape(): T;
  unescape(): T;
  ltrim(chars?: string): T;
  normalizeEmail(options?: Options.NormalizeEmailOptions): T;
  rtrim(chars?: string): T;
  stripLow(keep_new_lines?: boolean): T;
  toArray(): T;
  toBoolean(strict?: boolean): T;
  toDate(): T;
  toFloat(): T;
  toInt(radix?: number): T;
  toLowerCase(): T;
  toUpperCase(): T;
  trim(chars?: string): T;
  whitelist(chars: string): T;
}
