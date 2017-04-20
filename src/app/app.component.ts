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

  public format: NumberFormat = new NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  public setNull(): void {
    this.amount = null;
  }

  public setZero(): void {
    this.amount = 0;
  }
}
