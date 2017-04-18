import { AngularCurrencyInputPage } from './app.po';

describe('angular-currency-input App', () => {
  let page: AngularCurrencyInputPage;

  beforeEach(() => {
    page = new AngularCurrencyInputPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sho works!');
  });
});
