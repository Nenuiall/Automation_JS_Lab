const logger = require('../helpers/logger');
const getNeededElementFromTable = require('../helpers/helpers');
const MainPage = require('./main-page');

class CheckoutPage extends MainPage {
  get currentAccordionButton() {
    return $('.accordion-toggle');
  }

  get currentContinueButton() {
    return $('[aria-expanded="true"] input[value="Continue"]');
  }

  get existingAddressCheckbox() {
    return $('input[value="existing"]');
  }

  get cashOnDeliveryCheckbox() {
    return $('input[value="cod"]');
  }

  get payPalExpressCheckoutCheckbox() {
    return $('input[value="pp_express"]');
  }

  get iHaveReadAndAgreeInput() {
    return $('input[name="agree"]');
  }

  get payViaPayPalButton() {
    return $('.paypal-button');
  }

  get confirmOrderButton() {
    return $('#button-confirm');
  }

  async choseExistingAddress(value) {
    const existingAddressDropdown = await $('select[name="address_id"]');
    logger.debug(`chose an address in the dropdown ${existingAddressDropdown} by attribute ${value}`);
    await existingAddressDropdown.selectByAttribute('value', value);
  }

  async getAmount(typeOfAmount) {
    return getNeededElementFromTable(typeOfAmount, '#collapse-checkout-confirm tfoot tr', 'td', 'td:nth-child(2)');
  }
}

module.exports = new CheckoutPage();
