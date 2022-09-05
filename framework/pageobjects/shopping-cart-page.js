const MainPage = require('./main-page');

class ShoppingCartPage extends MainPage {
  get checkoutButton() {
    return $('//a[@class="btn btn-primary"]');
  }

  get billingDetailsContinue() {
    return $('//input[@id="button-payment-address"]');
  }

  get deliveryDetailsContinue() {
    return $('//input[@id="button-shipping-address"]');
  }

  get deliveryMethodContinue() {
    return $('//input[@id="button-shipping-method"]');
  }

  get paymentMethodContinue() {
    return $('//input[@id="button-payment-method"]');
  }

  get confirmButton() {
    return $('//input[@id="button-confirm"]');
  }

  get cashOnDeliveryOption() {
    return $('//input[@value="cod"]');
  }

  get termsAndConditionsAgree() {
    return $('//input[@name="agree"]');
  }

  get successMessage() {
    return $('//p[contains(text(),"Your order has been successfully")]');
  }
}

module.exports = new ShoppingCartPage();
