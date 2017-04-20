import {Pipe, PipeTransform} from "@angular/core";
import NumberFormat = Intl.NumberFormat;

import {NumberFormatter} from "app/number-format/number-formatter";
@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, numberFormat?: NumberFormat) {
    return NumberFormatter.transform(value, numberFormat);
  }
}
