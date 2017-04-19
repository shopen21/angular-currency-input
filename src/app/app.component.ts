import { Component } from '@angular/core';
import {CurrencyFormatOptions} from "app/currency-input/currency-format-options";

@Component({
  selector: 'sho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sho works!';
  amount: number = 234;

  public formatOptions: CurrencyFormatOptions;

  constructor(){
    this.formatOptions = new CurrencyFormatOptions('$ ', ' cents', 2, '; ', ',');
  }
}
