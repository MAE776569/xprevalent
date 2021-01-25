/* eslint-disable no-unused-vars */
import * as Options from "./options";

export type ValidationLocation = "body" | "params" | "query";

declare module "validator" {
  export function contains(
    str: string,
    elem: any,
    options?: Options.ContainsOptions
  ): boolean;
  export function equals(str: string, comparison: string): boolean;
  export function isAfter(str: string, date?: string): boolean;
  export function isAlpha(
    str: string,
    locale?: Options.AlphaLocale,
    options?: Options.IsAlphaOptions
  ): boolean;
  export function isAlphanumeric(
    str: string,
    locale?: Options.AlphanumericLocale
  ): boolean;
  export function isAscii(str: string): boolean;
  export function isBase32(str: string): boolean;
  export function isBase58(str: string): boolean;
  export function isBase64(
    str: string,
    options?: Options.IsBase64Options
  ): boolean;
  export function isBefore(str: string, date?: string): boolean;
  export function isBIC(str: string): boolean;
  export function isBoolean(str: string): boolean;
  export function isBtcAddress(str: string): boolean;
  export function isByteLength(
    str: string,
    options: Options.MinMaxOptions
  ): boolean;
  export function isCreditCard(str: string): boolean;
  export function isCurrency(
    str: string,
    options?: Options.IsCurrencyOptions
  ): boolean;
  export function isDataURI(str: string): boolean;
  export function isDate(str: string, options?: Options.IsDateOptions): boolean;
  export function isDecimal(
    str: string,
    options?: Options.IsDecimalOptions
  ): boolean;
  export function isDivisibleBy(str: string, number: number): boolean;
  export function isEAN(str: string): boolean;
  export function isEmail(
    str: string,
    options?: Options.IsEmailOptions
  ): boolean;
  export function isEmpty(
    str: string,
    options?: Options.IsEmptyOptions
  ): boolean;
  export function isEthereumAddress(str: string): boolean;
  export function isFQDN(str: string, options?: Options.IsFQDNOptions): boolean;
  export function isFloat(
    str: string,
    options?: Options.IsFloatOptions
  ): boolean;
  export function isFullWidth(str: string): boolean;
  export function isHalfWidth(str: string): boolean;
  export function isHash(
    str: string,
    algorithm: Options.HashAlgorithm
  ): boolean;
  export function isHexColor(str: string): boolean;
  export function isHexadecimal(str: string): boolean;
  export function isHSL(str: string): boolean;
  export function isIBAN(str: string): boolean;
  export function isIdentityCard(
    str: string,
    locale?: Options.IdentityCard
  ): boolean;
  export function isIMEI(str: string, options?: Options.IsIMEIOptions): boolean;
  export function isIP(str: string, version?: Options.IPVersion): boolean;
  export function isIPRange(str: string): boolean;
  export function isISBN(str: string, version?: number): boolean;
  export function isISSN(str: string, options?: Options.IsISSNOptions): boolean;
  export function isISIN(str: string): boolean;
  export function isISO8601(
    str: string,
    options?: Options.IsISO8601Options
  ): boolean;
  export function isISO31661Alpha2(str: string): boolean;
  export function isISO31661Alpha3(str: string): boolean;
  export function isISRC(str: string): boolean;
  export function isIn(str: string, values: any[]): boolean;
  export function isInt(str: string, options?: Options.IsIntOptions): boolean;
  export function isJSON(str: string, options?: Options.IsJSONOptions): boolean;
  export function isJWT(str: string): boolean;
  export function isLatLong(
    str: string,
    options?: Options.IsLatLongOptions
  ): boolean;
  export function isLength(
    str: string,
    options: Options.MinMaxOptions
  ): boolean;
  export function isLocale(str: string): boolean;
  export function isLowercase(str: string): boolean;
  export function isMagnetURI(str: string): boolean;
  export function isMACAddress(
    str: string,
    options: Options.IsMACAddressOptions
  ): boolean;
  export function isMD5(str: string): boolean;
  export function isMimeType(str: string): boolean;
  export function isMobilePhone(
    str: string,
    locale: Options.MobilePhoneLocale | Options.MobilePhoneLocale[],
    options?: Options.IsMobilePhoneOptions
  ): boolean;
  export function isMongoId(str: string): boolean;
  export function isMultibyte(str: string): boolean;
  export function isNumeric(
    str: string,
    options?: Options.IsNumericOptions
  ): boolean;
  export function isOctal(str: string): boolean;
  export function isPassportNumber(
    str: string,
    countryCode?: Options.PassportCountryCode
  ): boolean;
  export function isPort(str: string): boolean;
  export function isPostalCode(
    str: string,
    locale: Options.PostalCodeLocale
  ): boolean;
  export function isRFC3339(str: string): boolean;
  export function isRgbColor(
    str: string,
    includePercentValues?: boolean
  ): boolean;
  export function isSemVer(str: string): boolean;
  export function isSlug(str: string): boolean;
  export function isStrongPassword(
    str: string,
    options?: Options.IsStrongPasswordOptions
  ): boolean;
  export function isSurrogatePair(str: string): boolean;
  export function isTaxID(str: string, locale: Options.TaxIDLocale): boolean;
  export function isURL(str: string, options?: Options.IsURLOptions): boolean;
  export function isUUID(str: string, version?: Options.UUIDVersion): boolean;
  export function isUppercase(str: string): boolean;
  export function isVariableWidth(str: string): boolean;
  export function isVAT(
    str: string,
    countryCode: Options.VATCountryCode
  ): boolean;
  export function isWhitelisted(str: string, chars: string | string[]): boolean;
  export function matches(
    str: string,
    pattern: RegExp | string,
    modifiers?: string
  ): boolean;

  export function blacklist(str: string, chars: string): string;
  export function escape(str: string): string;
  export function unescape(str: string): string;
  export function ltrim(str: string, chars?: string): string;
  export function normalizeEmail(
    str: string,
    options?: Options.NormalizeEmailOptions
  ): string;
  export function rtrim(str: string, chars?: string): string;
  export function stripLow(str: string, keep_new_lines?: boolean): string;
  export function toBoolean(str: string, strict?: boolean): boolean;
  export function toDate(str: string): Date;
  export function toFloat(str: string): number;
  export function toInt(str: string, radix?: number): string;
  export function trim(str: string, chars?: string): string;
  export function whitelist(str: string, chars: string): string;
  export function toString(str: string): string;
}
