const logger = require('../helpers/logger');
const MainPage = require('./main-page');
const getNeededElementFromTable = require('../helpers/helpers');

class MainCartPage extends MainPage {
  async getQuantityInput(row) {
    return $(`#content form tbody tr:nth-child(${row}) input`);
  }

  async getRemoveItemButton(row) {
    return $(`#content form tbody tr:nth-child(${row}) button[type="button"]`);
  }

  async getQuantityUpdateButton(row) {
    return $(`#content form tbody tr:nth-child(${row}) button[type="submit"]`);
  }

  get successAlertMessage() {
    return $('.alert');
  }

  get shoppingCartContent() {
    return $('#content p');
  }

  async getSuccessAlertMessage() {
    await $('.alert').waitForExist({ timeout: 5000 });
    logger.debug(`get text from allert message ${$('.alert')}`);
    const textFromAlert = $('.alert').getText();
    return textFromAlert;
  }

  get useCouponCodeDropdown() {
    return $('#accordion a[href="#collapse-coupon"]');
  }

  get useGiftCertificateDropdown() {
    return $('#accordion a[href="#collapse-shipping"]');
  }

  get estimateShippingTaxesDropdown() {
    return $('#accordion a[href="#collapse-shipping"]');
  }

  get checkOutButton() {
    return $('.clearfix .pull-right');
  }

  async getAmount(typeOfAmount) {
    const neededElement = await getNeededElementFromTable(typeOfAmount, '#content .row tr', 'td', 'td:nth-child(2)');
    logger.debug(`get text from amount field ${neededElement}`);
    return neededElement;
  }

  async applyCouponCode(code) {
    logger.info('fill in use coupon cod form');
    await $('#input-coupon').waitForExist({ timeout: 5000 });
    logger.debug(`set value ${code} to the input field ${$('#input-coupon')}`);
    await $('#input-coupon').setValue(code);
    await $('#button-coupon').waitForClickable({ timeout: 5000 });
    logger.debug(`click apply coupon button ${$('#button-coupon')}`);
    await $('#button-coupon').click();
  }

  async applyGiftCertificate(voucher) {
    logger.info('fill in use gift certificate form');
    logger.debug(`set value ${voucher} to the input field ${$('#input-voucher')}`);
    await $('#input-voucher').setValue(voucher);
    logger.debug(`click apply gift certificate button ${$('#button-voucher')}`);
    await $('#button-voucher').click();
  }

  async changeShippingEstimate(country, region, postCode) {
    logger.info('fill in estimate Shipping form');
    logger.debug(`select ${country} from the select menu ${$('#input-country')}`);
    await $('#input-country').selectByAttribute('value', country);
    logger.debug(`select ${region} from the select menu ${$('#input-zone')}`);
    await $('#input-zone').selectByAttribute('value', region);
    logger.debug(`set value ${postCode} to the input field ${$('#input-postcode')}`);
    await $('#input-postcode').setValue(postCode);
    logger.debug(`click get quotes button ${$('#button-quote')}`);
    await $('#button-quote').click();
  }

  async getUnitPrice(row) {
    return $(`#content form tbody :nth-child(${row}) td:nth-child(5)`);
  }

  get yourOrderHasBeenPlacedMessage() {
    return $('#content h1');
  }

  get flatShippingRateCheckBox() {
    return $('div[class="radio"] label');
  }

  get applyShippingButton() {
    return $('#button-shipping');
  }
}

module.exports = new MainCartPage();
