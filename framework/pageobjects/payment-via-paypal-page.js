const MainPage = require('./main-page');

class PaymentViaPaypalPage extends MainPage {
  get payNowButton() {
    return $('#payment-submit-btn');
  }

  async login(username, password) {
    await $('#btnNext').waitForClickable();
    await $('#email').setValue(username);
    await $('#btnNext').click();
    await $('#btnLogin').waitForClickable();
    await $('#password').setValue(password);
    await $('#btnLogin').click();
    await this.payNowButton.waitForClickable();
  }

  async switchWindow(matcher) {
    await browser.switchWindow(matcher);
  }
}

module.exports = new PaymentViaPaypalPage();
