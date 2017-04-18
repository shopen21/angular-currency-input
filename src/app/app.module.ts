import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {MoneyMaskModule} from 'ng2-money-mask'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CurrencyMaskModule,
    MoneyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
