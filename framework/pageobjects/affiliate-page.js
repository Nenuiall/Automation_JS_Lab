const MainPage = require('./main-page');

class AffiliatePage extends MainPage {
  get companyField() {
    return $('//input[@id="input-company"]');
  }

  get webSiteField() {
    return $('//input[@id="input-website"]');
  }

  get taxIdField() {
    return $('//input[@id="input-tax"]');
  }

  get bankPaymentMethod() {
    return $('//input[@value="bank"]');
  }

  get payPalPaymentMethod() {
    return $('//input[@value="paypal"]');
  }

  get accountName() {
    return $('//input[@id="input-bank-account-name"]');
  }

  get accountNumber() {
    return $('//input[@id="input-bank-account-number"]');
  }

  get payPalEmailAccount() {
    return $('//input[@id="input-paypal"]');
  }

  get agreeAboutUs() {
    return $('//input[@name="agree"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }
}

module.exports = new AffiliatePage();
