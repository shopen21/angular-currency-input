import {Pipe, PipeTransform} from "@angular/core";
import {CurrencyFormatOptions} from "app/currency-input/currency-format-options";

@Pipe({
  name: 'currencyAdvanced'
})
export class CurrencyInputPipe implements PipeTransform {
  transform(value: number, options: CurrencyFormatOptions = new CurrencyFormatOptions()): string {
    let normalizedValue = value ? value : 0;
    let fraction = normalizedValue % 1;
    let integer = Math.floor(normalizedValue);


    let pieces = {
      prefix: options.prefix,
      integer: CurrencyInputPipe.integerToThousands(integer, options.thousandSeparator),
      separator: options.decimalSeparator,
      decimal: CurrencyInputPipe.fractionToString(fraction, options.decimalLength),
      suffix: options.suffix
    };
    return `${pieces.prefix}${pieces.integer}${pieces.separator}${pieces.decimal}${pieces.suffix}`;
  }

  parse(value: string, options: CurrencyFormatOptions = new CurrencyFormatOptions()): number {
    if (!value) return 0;
    value = value.slice(options.prefix.length);
    if (options.suffix.length) {
      value = value.slice(0, -options.suffix.length);
    }
    let [ integerPart, fractionPart = '' ] = (value || '').split(options.decimalSeparator);
    integerPart = integerPart.replace(new RegExp(`\\${options.thousandSeparator}`), '');

    return parseFloat(`${integerPart}.${fractionPart}`);
  }

  static toNumericString(value: number, options: CurrencyFormatOptions): string {
    return value.toFixed(options.decimalLength);
  }

  private static integerToThousands(value: number, separator: string): string {
    let str = value.toFixed(0);
    let resultArr = [];
    while (str.length > 0) {
      resultArr.push(str.slice(-3));
      str = str.slice(0, -3);
    }

    return resultArr.join(separator);
  }

  private static fractionToString(value: number, decimalLength: number): string {
    decimalLength = Math.floor(decimalLength);
    decimalLength = decimalLength >= 0 ? decimalLength : 0;
    let multiplier = Math.pow(10, decimalLength);
    return Math.floor(value * multiplier).toFixed(0);
  }
}
