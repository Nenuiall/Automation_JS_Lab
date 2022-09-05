const logger = require('../helpers/logger');
const MainPage = require('./main-page');
const getNeededElementFromTable = require('../helpers/helpers');

class DropDownCart extends MainPage {
  async getDeleteButton(item) {
    return getNeededElementFromTable(item, '#cart li:nth-child(1) tr', 'td:nth-child(2) a', 'td:nth-child(3) button');
  }

  get viewCartButton() {
    return $('#cart p .btn-default');
  }

  get numberOfGoodsInCart() {
    return $$('#cart li:nth-child(1) tr').length;
  }

  async isEmpty() {
    await $('#cart p').waitUntil(async () => {
      logger.info('get text from shopping cart');
      const textFromElement = await $('#cart p').getText();
      return textFromElement === 'Your shopping cart is empty!';
    });
    const textFromElement = await $('#cart p').getText();
    return textFromElement === 'Your shopping cart is empty!';
  }

  get checkOutButton() {
    return $('#cart p .btn-primary');
  }

  async getAmount(typeOfAmount) {
    return getNeededElementFromTable(typeOfAmount, '#cart li:nth-child(2) tr', 'td', 'td:nth-child(2)');
  }
}

module.exports = new DropDownCart();
