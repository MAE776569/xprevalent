/* eslint-disable no-unused-vars */
import * as Options from "./options";

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    contains(
      elem: any,
      options?: Options.ContainsOptions
    ): StringSchema<TType, TContext>;
    alpha(
      locale?: Options.AlphaLocale,
      options?: Options.IsAlphaOptions
    ): StringSchema<TType, TContext>;
    alphanumeric(
      locale?: Options.AlphanumericLocale
    ): StringSchema<TType, TContext>;
    ascii(): StringSchema<TType, TContext>;
    base32(): StringSchema<TType, TContext>;
    base58(): StringSchema<TType, TContext>;
    base64(options?: Options.IsBase64Options): StringSchema<TType, TContext>;
    BIC(): StringSchema<TType, TContext>;
    btcAddress(): StringSchema<TType, TContext>;
    byteLength(options: Options.MinMaxOptions): StringSchema<TType, TContext>;
    creditCard(): StringSchema<TType, TContext>;
    currency(
      options?: Options.IsCurrencyOptions
    ): StringSchema<TType, TContext>;
    dataURI(): StringSchema<TType, TContext>;
    EAN(): StringSchema<TType, TContext>;
    ethereumAddress(): StringSchema<TType, TContext>;
    FQDN(): StringSchema<TType, TContext>;
    hasFullWidth(): StringSchema<TType, TContext>;
    hasHalfWidth(): StringSchema<TType, TContext>;
    hash(algorithm: Options.HashAlgorithm): StringSchema<TType, TContext>;
    hexadecimal(): StringSchema<TType, TContext>;
    hexColor(): StringSchema<TType, TContext>;
    HSL(): StringSchema<TType, TContext>;
    IBAN(): StringSchema<TType, TContext>;
    identityCard(locale: Options.IdentityCard): StringSchema<TType, TContext>;
    IMEI(options?: Options.IsIMEIOptions): StringSchema<TType, TContext>;
    IP(version?: Options.IPVersion): StringSchema<TType, TContext>;
    IPRange(): StringSchema<TType, TContext>;
    ISBN(version?: number): StringSchema<TType, TContext>;
    ISIN(): StringSchema<TType, TContext>;
    ISO31661Alpha2(): StringSchema<TType, TContext>;
    ISO31661Alpha3(): StringSchema<TType, TContext>;
    ISRC(): StringSchema<TType, TContext>;
    ISSN(options?: Options.IsISSNOptions): StringSchema<TType, TContext>;
    JWT(): StringSchema<TType, TContext>;
    latLong(options?: Options.IsLatLongOptions): StringSchema<TType, TContext>;
    licensePlate(
      locale?: Options.licensePlateLocale
    ): StringSchema<TType, TContext>;
    locale(): StringSchema<TType, TContext>;
    MACAddress(
      options?: Options.IsMACAddressOptions
    ): StringSchema<TType, TContext>;
    magnetURI(): StringSchema<TType, TContext>;
    MD5(): StringSchema<TType, TContext>;
    mimeType(): StringSchema<TType, TContext>;
    mobilePhone(
      locale: Options.MobilePhoneLocale | Options.MobilePhoneLocale[],
      options?: Options.IsMobilePhoneOptions
    ): StringSchema<TType, TContext>;
    mongoId(): StringSchema<TType, TContext>;
    hasMultibyte(): StringSchema<TType, TContext>;
    octal(): StringSchema<TType, TContext>;
    passportNumber(
      countryCode?: Options.PassportCountryCode
    ): StringSchema<TType, TContext>;
    port(): StringSchema<TType, TContext>;
    postalCode(locale: Options.PostalCodeLocale): StringSchema<TType, TContext>;
    rgbColor(includePercentValues?: boolean): StringSchema<TType, TContext>;
    semVer(): StringSchema<TType, TContext>;
    hasSurrogatePair(): StringSchema<TType, TContext>;
    slug(): StringSchema<TType, TContext>;
    strongPassword(): StringSchema<TType, TContext>;
    taxID(locale: Options.TaxIDLocale): StringSchema<TType, TContext>;
    hasVariableWidthChars(): StringSchema<TType, TContext>;
    VAT(countryCode: Options.VATCountryCode): StringSchema<TType, TContext>;
    removeChars(chars: string): StringSchema<TType, TContext>;
    escape(): StringSchema<TType, TContext>;
    unescape(): StringSchema<TType, TContext>;
    ltrim(chars?: string): StringSchema<TType, TContext>;
    rtrim(chars?: string): StringSchema<TType, TContext>;
    normalizeEmail(
      options?: Options.NormalizeEmailOptions
    ): StringSchema<TType, TContext>;
    keepChars(chars: string): StringSchema<TType, TContext>;
    stripLow(keep_new_lines?: boolean): StringSchema<TType, TContext>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    decimal(options?: Options.IsDecimalOptions): NumberSchema<TType, TContext>;
    divisibleBy(number: number): NumberSchema<TType, TContext>;
    float(options?: Options.IsFloatOptions): NumberSchema<TType, TContext>;
  }

  interface DateSchema<
    TType extends Maybe<Date> = Date | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    ISO8601(options?: Options.IsISO8601Options): DateSchema<TType, TContext>;
    RFC3339(): DateSchema<TType, TContext>;
  }
}
