import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {CurrencyInputModule} from "app/currency-input/currency-input.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CurrencyMaskModule,
    CurrencyInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
