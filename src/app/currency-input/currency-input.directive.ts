import {Directive, ElementRef, forwardRef, HostListener, Input, Provider, Renderer} from "@angular/core";
import {CurrencyFormatOptions} from "app/currency-input/currency-format-options";
import {ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CurrencyInputPipe} from "app/currency-input/currency-input.pipe";

const CUSTOM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyInputDirective),
  multi: true
};

@Directive({
  selector: 'input[sho-currency-input][type="text"]',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class CurrencyInputDirective implements ControlValueAccessor {

  @Input('currencyInput') inputOptions: CurrencyFormatOptions = new CurrencyFormatOptions();

  @HostListener('input', ['$event.target.value']) onInput(userInputValue): void {
    let parsedNumber = this.transformer.parse(userInputValue, this.inputOptions);
    if (Number.isNaN(parsedNumber)) {
      this.doWriteValue(this.numericValue);
    }
    else {
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

  private onChange = (_:number) => {
  };

  constructor(private element: ElementRef,
              private transformer: CurrencyInputPipe,
              private valueAccessor: DefaultValueAccessor) {
  }

  writeValue(numericValue: number): void {
    this.numericValue = numericValue;
    this.doWriteValue(numericValue);
  }

  private doWriteValue(numericValue: number): void {
    let stringValue = (this.isFocused ? CurrencyInputPipe.toNumericString : this.transformer.transform)(numericValue, this.inputOptions);
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
