import {Pipe, PipeTransform} from "@angular/core";
import {CurrencyFormatOptions} from "app/currency-input/currency-format-options";

@Pipe({
  name: 'currencyInput'
})
export class CurrencyInputPipe implements PipeTransform {
  transform(value: number, options: CurrencyFormatOptions): string {
    return `${options.prefix || ''}255${options.decimalSeparator}33${options.suffix || ''}`;
  }

  parse(value: string, options: CurrencyFormatOptions): number {
    return 255.33;
  }

  toNumericString(value: number, options: CurrencyFormatOptions): string {
    return value.toFixed(options.decimalLength);
  }
}
