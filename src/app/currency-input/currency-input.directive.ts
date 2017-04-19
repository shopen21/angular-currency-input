import {Directive, ElementRef, forwardRef, HostListener, Input, OnInit, Provider} from "@angular/core";
import {CurrencyFormatOptions} from "app/currency-input/currency-format-options";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CurrencyInputPipe} from "app/currency-input/currency-input.pipe";

const CUSTOM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyInputDirective),
  multi: true
};

@Directive({
  selector: 'input[currency-input][type="text"]',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class CurrencyInputDirective implements ControlValueAccessor {

  @Input('currencyInput') inputOptions: CurrencyFormatOptions = new CurrencyFormatOptions();

  @HostListener('focus') onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('blur') onBlur(): void {
    this.isFocused = false;
  }

  private onTouched = _ => {
  };
  private onChange = _ => {
  };

  private isFocused = false;

  constructor(private element: ElementRef, private transformer: CurrencyInputPipe) {
  }

  writeValue(numericValue: number): void {
    this.element.nativeElement.value = (this.isFocused ? this.transformer.toNumericString : this.transformer.transform)(numericValue, this.inputOptions);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
