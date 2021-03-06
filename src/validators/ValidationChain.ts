import {
  CustomValidator,
  Optional,
  StandardValidator,
  Validators
} from "../types/validation/validators";
import validator from "validator";
import * as Options from "../types/validation/options";
import Validator from "./Validator";
import Sanitizer from "./Sanitizer";
import {
  CustomSanitizer,
  Sanitizers,
  StandardSanitizer
} from "../types/validation/sanitizers";
import ValidationPipeline from "./ValidationPipeline";
import { ArraySchemaOptions, SchemaObject } from "../types/validation/schema";
import ArraySchema from "./ArraySchema";

class ValidationChain<Chain> implements Validators<Chain>, Sanitizers<Chain> {
  // private lastItem: Validator | Sanitizer;
  private negateNext = false;
  private checkAll = false;
  private readonly pipeline: ValidationPipeline;
  private readonly chain: Chain;

  constructor(pipeline: ValidationPipeline, chain: Chain) {
    this.pipeline = pipeline;
    this.chain = chain;
  }

  private addItem(item: Validator | Sanitizer) {
    // this.lastItem = item;
    this.pipeline.push(item);
    this.negateNext = false;
    this.checkAll = false;
    return this.chain;
  }

  // validation manipulation
  not() {
    this.negateNext = true;
    return this.chain;
  }

  withMessage(message: string) {
    this.pipeline.setMessage(message);
    return this.chain;
  }

  all() {
    this.checkAll = true;
    return this.chain;
  }

  arraySchema(schema: SchemaObject, options?: ArraySchemaOptions): ArraySchema {
    return this.pipeline.createArraySchema(schema, options);
  }

  // custom validators
  custom(validator: CustomValidator) {
    const customValidator = new Validator(
      validator,
      this.negateNext,
      this.checkAll
    );
    customValidator.setCustom();
    return this.addItem(customValidator);
  }

  optional(options: Optional = {}) {
    this.pipeline.setOptional(options);
    return this.chain;
  }

  exists(options: { checkFalsy?: boolean; checkNull?: boolean } = {}) {
    let validator: CustomValidator;
    if (options.checkFalsy) {
      validator = (value) => !!value;
    } else if (options.checkNull) {
      validator = (value) => value != null;
    } else {
      validator = (value) => value !== undefined;
    }

    return this.custom(validator);
  }

  isArray(options: { min?: number; max?: number } = {}) {
    return this.custom(
      (value) =>
        Array.isArray(value) &&
        (typeof options.min === "undefined" || value.length >= options.min) &&
        (typeof options.max === "undefined" || value.length <= options.max)
    );
  }

  isObject(options: { strict?: boolean } = { strict: true }) {
    return this.custom(
      (value) =>
        typeof value === "object" &&
        (options.strict ? value !== null && !Array.isArray(value) : true)
    );
  }

  isString() {
    return this.custom((value) => typeof value === "string");
  }

  notEmpty(options?: Options.IsEmptyOptions) {
    this.not();
    return this.isEmpty(options);
  }

  // Standard validators
  private addStandardValidation(
    validator: StandardValidator,
    ...options: any[]
  ) {
    return this.addItem(
      new Validator(validator, this.negateNext, this.checkAll, options)
    );
  }

  contains(elem: any, options?: Options.ContainsOptions) {
    return this.addStandardValidation(validator.contains, elem, options);
  }
  equals(comparison: string) {
    return this.addStandardValidation(validator.equals, comparison);
  }
  isAfter(date?: string) {
    return this.addStandardValidation(validator.isAfter, date);
  }
  isAlpha(locale?: Options.AlphaLocale, options?: Options.IsAlphaOptions) {
    const ignore = Array.isArray(options?.ignore)
      ? options?.ignore.join("")
      : options?.ignore;
    return this.addStandardValidation(validator.isAlpha, locale, {
      ...options,
      ignore
    });
  }
  isAlphanumeric(locale?: Options.AlphanumericLocale) {
    return this.addStandardValidation(validator.isAlphanumeric, locale);
  }
  isAscii() {
    return this.addStandardValidation(validator.isAscii);
  }
  isBase32() {
    return this.addStandardValidation(validator.isBase32);
  }
  isBase58() {
    return this.addStandardValidation(validator.isBase58);
  }
  isBase64(options?: Options.IsBase64Options) {
    return this.addStandardValidation(validator.isBase64, options);
  }
  isBefore(date?: string) {
    return this.addStandardValidation(validator.isBefore, date);
  }
  isBIC() {
    return this.addStandardValidation(validator.isBIC);
  }
  isBoolean(options?: Options.IsBooleanOptions) {
    if (options?.strict) {
      return this.custom((value) => {
        return value === true || value === false;
      });
    }
    return this.addStandardValidation(validator.isBoolean);
  }
  isBtcAddress() {
    return this.addStandardValidation(validator.isBtcAddress);
  }
  isByteLength(options: Options.MinMaxOptions) {
    return this.addStandardValidation(validator.isByteLength, options);
  }
  isCreditCard() {
    return this.addStandardValidation(validator.isCreditCard);
  }
  isCurrency(options?: Options.IsCurrencyOptions) {
    return this.addStandardValidation(validator.isCurrency, options);
  }
  isDataURI() {
    return this.addStandardValidation(validator.isDataURI);
  }
  isDate(options?: Options.IsDateOptions) {
    return this.addStandardValidation(validator.isDate, options);
  }
  isDecimal(options?: Options.IsDecimalOptions) {
    return this.addStandardValidation(validator.isDecimal, options);
  }
  isDivisibleBy(number: number) {
    return this.addStandardValidation(validator.isDivisibleBy, number);
  }
  isEAN() {
    return this.addStandardValidation(validator.isEAN);
  }
  isEmail(options?: Options.IsEmailOptions) {
    return this.addStandardValidation(validator.isEmail, options);
  }
  isEmpty(options?: Options.IsEmptyOptions) {
    return this.addStandardValidation(validator.isEmpty, options);
  }
  isEthereumAddress() {
    return this.addStandardValidation(validator.isEthereumAddress);
  }
  isFQDN(options?: Options.IsFQDNOptions) {
    return this.addStandardValidation(validator.isFQDN, options);
  }
  isFloat(options?: Options.IsFloatOptions) {
    return this.addStandardValidation(validator.isFloat, options);
  }
  isFullWidth() {
    return this.addStandardValidation(validator.isFullWidth);
  }
  isHalfWidth() {
    return this.addStandardValidation(validator.isHalfWidth);
  }
  isHash(algorithm: Options.HashAlgorithm) {
    return this.addStandardValidation(validator.isHash, algorithm);
  }
  isHexColor() {
    return this.addStandardValidation(validator.isHexColor);
  }
  isHexadecimal() {
    return this.addStandardValidation(validator.isHexadecimal);
  }
  isHSL() {
    return this.addStandardValidation(validator.isHSL);
  }
  isIBAN() {
    return this.addStandardValidation(validator.isIBAN);
  }
  isIdentityCard(locale: Options.IdentityCard) {
    return this.addStandardValidation(validator.isIdentityCard, locale);
  }
  isIMEI(options?: Options.IsIMEIOptions) {
    return this.addStandardValidation(validator.isIMEI, options);
  }
  isIP(version?: Options.IPVersion) {
    return this.addStandardValidation(validator.isIP, version);
  }
  isIPRange() {
    return this.addStandardValidation(validator.isIPRange);
  }
  isISBN(version?: number) {
    return this.addStandardValidation(validator.isISBN, version);
  }
  isISSN(options?: Options.IsISSNOptions) {
    return this.addStandardValidation(validator.isISSN, options);
  }
  isISIN() {
    return this.addStandardValidation(validator.isISIN);
  }
  isISO8601(options?: Options.IsISO8601Options) {
    return this.addStandardValidation(validator.isISO8601, options);
  }
  isISO31661Alpha2() {
    return this.addStandardValidation(validator.isISO31661Alpha2);
  }
  isISO31661Alpha3() {
    return this.addStandardValidation(validator.isISO31661Alpha3);
  }
  isISRC() {
    return this.addStandardValidation(validator.isISRC);
  }
  isIn(values: any[]) {
    return this.addStandardValidation(validator.isIn, values);
  }
  isInt(options?: Options.IsIntOptions) {
    return this.addStandardValidation(validator.isInt, options);
  }
  isJSON(options?: Options.IsJSONOptions) {
    return this.addStandardValidation(validator.isJSON, options);
  }
  isJWT() {
    return this.addStandardValidation(validator.isJWT);
  }
  isLatLong(options?: Options.IsLatLongOptions) {
    return this.addStandardValidation(validator.isLatLong, options);
  }
  isLength(options: Options.MinMaxOptions) {
    return this.addStandardValidation(validator.isLength, options);
  }
  isLocale() {
    return this.addStandardValidation(validator.isLocale);
  }
  isLowercase() {
    return this.addStandardValidation(validator.isLowercase);
  }
  isMagnetURI() {
    return this.addStandardValidation(validator.isMagnetURI);
  }
  isMACAddress(options?: Options.IsMACAddressOptions) {
    return this.addStandardValidation(validator.isMACAddress, options);
  }
  isMD5() {
    return this.addStandardValidation(validator.isMD5);
  }
  isMimeType() {
    return this.addStandardValidation(validator.isMimeType);
  }
  isMobilePhone(
    locale: Options.MobilePhoneLocale | Options.MobilePhoneLocale[],
    options?: Options.IsMobilePhoneOptions
  ) {
    return this.addStandardValidation(validator.isMobilePhone, locale, options);
  }
  isMongoId() {
    return this.addStandardValidation(validator.isMongoId);
  }
  isMultibyte() {
    return this.addStandardValidation(validator.isMultibyte);
  }
  isNumeric(options?: Options.IsNumericOptions) {
    return this.addStandardValidation(validator.isNumeric, options);
  }
  isOctal() {
    return this.addStandardValidation(validator.isOctal);
  }
  isPassportNumber(countryCode?: Options.PassportCountryCode) {
    return this.addStandardValidation(validator.isPassportNumber, countryCode);
  }
  isPort() {
    return this.addStandardValidation(validator.isPort);
  }
  isPostalCode(locale: Options.PostalCodeLocale) {
    return this.addStandardValidation(validator.isPostalCode, locale);
  }
  isRFC3339() {
    return this.addStandardValidation(validator.isRFC3339);
  }
  isRgbColor(includePercentValues?: boolean) {
    return this.addStandardValidation(
      validator.isRgbColor,
      includePercentValues
    );
  }
  isSemVer() {
    return this.addStandardValidation(validator.isSemVer);
  }
  isSlug() {
    return this.addStandardValidation(validator.isSlug);
  }
  isStrongPassword(options?: Options.IsStrongPasswordOptions) {
    return this.addStandardValidation(validator.isStrongPassword, options);
  }
  isSurrogatePair() {
    return this.addStandardValidation(validator.isSurrogatePair);
  }
  isTaxID(locale: Options.TaxIDLocale) {
    return this.addStandardValidation(validator.isTaxID, locale);
  }
  isURL(options?: Options.IsURLOptions) {
    return this.addStandardValidation(validator.isURL, options);
  }
  isUUID(version?: Options.UUIDVersion) {
    return this.addStandardValidation(validator.isUUID, version);
  }
  isUppercase() {
    return this.addStandardValidation(validator.isUppercase);
  }
  isVariableWidth() {
    return this.addStandardValidation(validator.isVariableWidth);
  }
  isVAT(countryCode: Options.VATCountryCode) {
    return this.addStandardValidation(validator.isVAT, countryCode);
  }
  isWhitelisted(chars: string | string[]) {
    return this.addStandardValidation(validator.isWhitelisted, chars);
  }
  matches(pattern: RegExp | string, modifiers?: string) {
    return this.addStandardValidation(validator.matches, pattern, modifiers);
  }

  // custom sanitizers
  customSanitizer(sanitizer: CustomSanitizer) {
    this.addItem(new Sanitizer(sanitizer));
    return this.chain;
  }

  default(default_value: any) {
    return this.customSanitizer((value) =>
      [undefined, null, NaN, ""].includes(value) ? default_value : value
    );
  }

  replace(values_to_replace: any, new_value: any) {
    if (!Array.isArray(values_to_replace)) {
      values_to_replace = [values_to_replace];
    }
    return this.customSanitizer((value) =>
      values_to_replace.includes(value) ? new_value : value
    );
  }

  // Standard sanitizers
  private addStandardSanitization(
    sanitizer: StandardSanitizer,
    ...options: any[]
  ) {
    this.addItem(new Sanitizer(sanitizer, options));
    return this.chain;
  }

  blacklist(chars: string) {
    return this.addStandardSanitization(validator.blacklist, chars);
  }
  escape() {
    return this.addStandardSanitization(validator.escape);
  }
  unescape() {
    return this.addStandardSanitization(validator.unescape);
  }
  ltrim(chars?: string) {
    return this.addStandardSanitization(validator.ltrim, chars);
  }
  normalizeEmail(options?: Options.NormalizeEmailOptions) {
    return this.addStandardSanitization(validator.normalizeEmail, options);
  }
  rtrim(chars?: string) {
    return this.addStandardSanitization(validator.rtrim, chars);
  }
  stripLow(keep_new_lines?: boolean) {
    return this.addStandardSanitization(validator.stripLow, keep_new_lines);
  }
  toArray() {
    return this.customSanitizer(
      (value) =>
        (value !== undefined && ((Array.isArray(value) && value) || [value])) ||
        []
    );
  }
  toBoolean(strict?: boolean) {
    return this.addStandardSanitization(validator.toBoolean, strict);
  }
  toDate() {
    return this.addStandardSanitization(validator.toDate);
  }
  toFloat() {
    return this.addStandardSanitization(validator.toFloat);
  }
  toInt(radix?: number) {
    return this.addStandardSanitization(validator.toInt, radix);
  }
  toLowerCase() {
    return this.customSanitizer((value) =>
      typeof value === "string" ? value.toLowerCase() : value
    );
  }
  toUpperCase() {
    return this.customSanitizer((value) =>
      typeof value === "string" ? value.toUpperCase() : value
    );
  }
  trim(chars?: string) {
    return this.addStandardSanitization(validator.trim, chars);
  }
  whitelist(chars: string) {
    return this.addStandardSanitization(validator.whitelist, chars);
  }
}

export = ValidationChain;
