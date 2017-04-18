import { browser, element, by } from 'protractor';

export class AngularCurrencyInputPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sho-root h1')).getText();
  }
}
