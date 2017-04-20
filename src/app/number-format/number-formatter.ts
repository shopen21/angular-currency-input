import NumberFormat = Intl.NumberFormat;
export class NumberFormatter {
  private static matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

  // Converts from Number value to localized format like '$ 1,234,567.89'
  public static transform(value: number, numberFormat?: NumberFormat): string {
    return numberFormat ? numberFormat.format(value) : value.toLocaleString();
  }

  // Converts from String (like '-1234.56') to Number
  public static parse(value: string, numberFormat: NumberFormat): number {
    let options = numberFormat.resolvedOptions();
    if (!value) return 0;
    let normalizedDecimalString = this.normalizeDecimalString(value, numberFormat);
    if (Number.isNaN(Number.parseFloat(normalizedDecimalString))) return Number.NaN;
    let regexp = new RegExp(`^-?[0-9]*(${this.escapeRegexp(this.getDecimalSeparator(numberFormat))}[0-9]{0,${options.maximumFractionDigits}})?$`);
    if (!regexp.test(value)) {
      return Number.NaN;
    }
    return parseFloat(normalizedDecimalString);
  }

  // from number to String like '-1234.56'
  public static toNumericString(value: number, numberFormat: NumberFormat): string {
    let options = numberFormat.resolvedOptions();
    return value.toLocaleString(options.locale, {
      minimumFractionDigits: options.maximumFractionDigits,
      maximumFractionDigits: options.maximumFractionDigits,
      useGrouping: false,
      style: 'decimal',
      minimumIntegerDigits: 1
    });
  }

  private static escapeRegexp(regexp: string) {
    return regexp.replace(NumberFormatter.matchOperatorsRe, '\\$&')
  }

  private static getDecimalSeparator(numberFormat?: NumberFormat): string {
    let locale = numberFormat ? numberFormat.resolvedOptions().locale : null;
    return /^1(.+)2$/.exec((1.2).toLocaleString(locale))[1];
  }

  private static normalizeDecimalString(value: string, numberFormat: NumberFormat): string {
    return value.replace(this.getDecimalSeparator(numberFormat), '.');
  }
}
