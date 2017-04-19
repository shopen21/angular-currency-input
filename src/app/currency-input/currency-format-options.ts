export class CurrencyFormatOptions {
  public prefix: string;
  public suffix: string;
  public decimalLength: number;
  public decimalSeparator: string;
  public thousandSeparator: string;

  constructor(prefix: string = '',
              suffix: string = '',
              decimalLength: number = 2,
              decimalSeparator: string = '.',
              thousandSeparator: string = ',') {
    this.prefix = prefix;
    this.suffix = suffix;
    this.decimalLength = decimalLength;
    this.decimalSeparator = decimalSeparator;
    this.thousandSeparator = thousandSeparator;
  }
}
