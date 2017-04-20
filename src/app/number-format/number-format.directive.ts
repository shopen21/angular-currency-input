import {Directive, forwardRef, HostListener, Input, Provider} from "@angular/core";
import {ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {NumberFormatPipe} from "app/number-format/number-format.pipe";
import NumberFormat = Intl.NumberFormat;

const CUSTOM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberFormatDirective),
  multi: true
};

@Directive({
  selector: 'input[number-format][type="text"]',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class NumberFormatDirective implements ControlValueAccessor {
  @Input('number-format') numberFormat: NumberFormat;

  @HostListener('input', ['$event.target.value']) onInput(userInputValue): void {
    let parsedNumber = this.transformer.parse(userInputValue, this.numberFormat);
    if (Number.isNaN(parsedNumber)) {
      // reset good value
      this.doWriteValue(this.numericValue);
    }
    else {
      this.numericValue = parsedNumber;
      this.onChange(parsedNumber);
    }
  }

  @HostListener('focus') onFocus(): void {
    this.isFocused = true;
    this.doWriteValue(this.numericValue);
  }

  @HostListener('blur') onBlur(): void {
    this.isFocused = false;
    this.doWriteValue(this.numericValue);
  }

  private isFocused = false;

  private numericValue: number = Number.NaN;

  private onChange = (_: number) => {
  };

  constructor(private transformer: NumberFormatPipe,
              private valueAccessor: DefaultValueAccessor) {
  }

  writeValue(numericValue: number): void {
    this.numericValue = numericValue;
    this.doWriteValue(numericValue);
  }

  private doWriteValue(numericValue: number): void {
    let stringValue = this.isFocused ? NumberFormatPipe.toNumericString(numericValue, this.numberFormat) : this.transformer.transform(numericValue, this.numberFormat);
    this.valueAccessor.writeValue(stringValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.valueAccessor.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.valueAccessor.setDisabledState(isDisabled);
  }
}
