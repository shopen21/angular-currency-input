import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyInputDirective} from "app/currency-input/currency-input.directive";
import {CurrencyInputPipe} from "app/currency-input/currency-input.pipe";

@NgModule({
  imports: [FormsModule],
  exports: [CurrencyInputDirective, CurrencyInputPipe],
  declarations: [CurrencyInputDirective, CurrencyInputPipe],
  providers: [CurrencyInputPipe]
})
export class CurrencyInputModule {
}
