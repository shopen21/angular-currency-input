import {Directive, forwardRef, HostListener, Input, OnChanges, Provider, SimpleChanges} from "@angular/core";
import {ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import NumberFormat = Intl.NumberFormat;
import {NumberFormatter} from "app/number-format/number-formatter";

const CUSTOM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberFormatDirective),
  multi: true
};

const DEFAULT_NUMBER_FORMAT = new NumberFormat('en-US', {
  style: 'decimal',
  minimumIntegerDigits: 1,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  useGrouping: false
});

@Directive({
  selector: 'input[number-format][type="text"]',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class NumberFormatDirective implements ControlValueAccessor, OnChanges {
  private _numberFormat: NumberFormat = DEFAULT_NUMBER_FORMAT;

  @Input('number-format') set numberFormat(value: NumberFormat) {
    this._numberFormat = value ? value : DEFAULT_NUMBER_FORMAT;
  }

  get numberFormat(): NumberFormat {
    return this._numberFormat;
  }

  @HostListener('input', ['$event.target.value']) onInput(userInputValue): void {
    let parsedNumber = NumberFormatter.parse(userInputValue, this.numberFormat);
    if (Number.isNaN(parsedNumber)) {
      // reset good value
      this.doWriteValue(this.numericValue);
    }
    else {
      this.numericValue = parsedNumber;
      this.onChange(parsedNumber);
    }
  }

  @HostListener('paste', ['$event']) onPaste(evt): void {
    if (evt.cancelable) {
      evt.preventDefault();
    }
    let clipboardValue = evt.clipboardData.getData('text');

    let parsedNumber = NumberFormatter.parse(clipboardValue, this.numberFormat) || parseFloat(clipboardValue);

    if (!Number.isNaN(parsedNumber)) {
      this.writeValue(parsedNumber);
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

  constructor(private valueAccessor: DefaultValueAccessor) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.numberFormat) {
      this.doWriteValue(this.numericValue);
    }
  }

  writeValue(numericValue: number): void {
    if (!numericValue) {
      numericValue = 0;
    }
    this.numericValue = numericValue;
    this.doWriteValue(numericValue);
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

  private doWriteValue(numericValue: number): void {
    let stringValue = this.isFocused ? NumberFormatter.toNumericString(numericValue, this.numberFormat) : NumberFormatter.transform(numericValue, this.numberFormat);
    this.valueAccessor.writeValue(stringValue);
  }
}
