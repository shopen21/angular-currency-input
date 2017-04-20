import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NumberFormatDirective} from './number-format.directive';
import {NumberFormatPipe} from './number-format.pipe';

@NgModule({
  imports: [FormsModule],
  exports: [NumberFormatDirective, NumberFormatPipe],
  declarations: [NumberFormatDirective, NumberFormatPipe],
  providers: [NumberFormatPipe]
})
export class NumberFormatModule {
}
