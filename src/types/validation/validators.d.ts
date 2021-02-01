/* eslint-disable no-unused-vars */
import * as Options from "./options";

type CustomValidator = (input: any) => boolean;
export type StandardValidator = (input: string, ...options: any[]) => boolean;

export interface Validators<T> {
  // validation manipulation
  not(): T;
  withMessage(message: any): T;
  all(): T;

  // custom validators
  custom(validator: CustomValidator): T;
  exists(options?: { checkFalsy?: boolean; checkNull?: boolean }): T;
  isArray(options?: { min?: number; max?: number }): T;
  isObject(options?: { strict?: boolean }): T;
  isString(): T;
  notEmpty(options?: Options.IsEmptyOptions): T;

  // validator's validators
  contains(elem: any, options?: Options.ContainsOptions): T;
  equals(comparison: string): T;
  isAfter(date?: string): T;
  isAlpha(locale?: Options.AlphaLocale, options?: Options.IsAlphaOptions): T;
  isAlphanumeric(locale?: Options.AlphanumericLocale): T;
  isAscii(): T;
  isBase32(): T;
  isBase58(): T;
  isBase64(options?: Options.IsBase64Options): T;
  isBefore(date?: string): T;
  isBIC(): T;
  isBoolean(options?: Options.IsBooleanOptions): T;
  isBtcAddress(): T;
  isByteLength(options: Options.MinMaxExtendedOptions): T;
  isCreditCard(): T;
  isCurrency(options?: Options.IsCurrencyOptions): T;
  isDataURI(): T;
  isDate(options?: Options.IsDateOptions): T;
  isDecimal(options?: Options.IsDecimalOptions): T;
  isDivisibleBy(number: number): T;
  isEAN(): T;
  isEmail(options?: Options.IsEmailOptions): T;
  isEmpty(options?: Options.IsEmptyOptions): T;
  isEthereumAddress(): T;
  isFQDN(options?: Options.IsFQDNOptions): T;
  isFloat(options?: Options.IsFloatOptions): T;
  isFullWidth(): T;
  isHalfWidth(): T;
  isHash(algorithm: Options.HashAlgorithm): T;
  isHexColor(): T;
  isHexadecimal(): T;
  isHSL(): T;
  isIBAN(): T;
  isIdentityCard(locale?: Options.IdentityCard): T;
  isIMEI(options?: Options.IsIMEIOptions): T;
  isIP(version?: Options.IPVersion): T;
  isIPRange(): T;
  isISBN(version?: number): T;
  isISSN(options?: Options.IsISSNOptions): T;
  isISIN(): T;
  isISO8601(options?: Options.IsISO8601Options): T;
  isISO31661Alpha2(): T;
  isISO31661Alpha3(): T;
  isISRC(): T;
  isIn(values: any[]): T;
  isInt(options?: Options.IsIntOptions): T;
  isJSON(options?: Options.IsJSONOptions): T;
  isJWT(): T;
  isLatLong(options?: Options.IsLatLongOptions): T;
  isLength(options: Options.MinMaxOptions): T;
  isLocale(): T;
  isLowercase(): T;
  isMagnetURI(): T;
  isMACAddress(options?: Options.IsMACAddressOptions): T;
  isMD5(): T;
  isMimeType(): T;
  isMobilePhone(
    locale: Options.MobilePhoneLocale | Options.MobilePhoneLocale[],
    options?: Options.IsMobilePhoneOptions
  ): T;
  isMongoId(): T;
  isMultibyte(): T;
  isNumeric(options?: Options.IsNumericOptions): T;
  isOctal(): T;
  isPassportNumber(countryCode?: Options.PassportCountryCode): T;
  isPort(): T;
  isPostalCode(locale: Options.PostalCodeLocale): T;
  isRgbColor(includePercentValues?: boolean): T;
  isRFC3339(): T;
  isSemVer(): T;
  isSlug(): T;
  isStrongPassword(options?: Options.IsStrongPasswordOptions): T;
  isSurrogatePair(): T;
  isTaxID(locale: Options.TaxIDLocale): T;
  isURL(options?: Options.IsURLOptions): T;
  isUUID(version?: Options.UUIDVersion): T;
  isUppercase(): T;
  isVariableWidth(): T;
  isVAT(countryCode: Options.VATCountryCode): T;
  isWhitelisted(chars: string | string[]): T;
  matches(pattern: RegExp | string, modifiers?: string): T;
}
