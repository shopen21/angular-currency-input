import {Component} from '@angular/core';
import NumberFormat = Intl.NumberFormat;

@Component({
  selector: 'sho-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sho works!';
  amount: number | null = 234.55;
  useFormat = true;

  private _format: NumberFormat = new NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  public get format(): NumberFormat {
    return this.useFormat ? this._format : null;
  }

  public setNull(): void {
    this.amount = null;
  }

  public setZero(): void {
    this.amount = 0;
  }
}
