const logger = require('../helpers/logger');

class ProductComparisonPage {
  getProduct(name) {
    return $(`//strong[contains(text(), "${name}")]`);
  }

  get removeButtons() {
    return $$('//a[contains(text(),"Remove")]');
  }

  get successMessage() {
    return $('.alert.alert-success.alert-dismissible');
  }

  get isNoProduct() {
    return $('//p[contains(text(), "not chosen any products to compare")]');
  }

  async isProductsExist(arr) {
    let answ = true;
    await arr.forEach(async (name) => {
      logger.info(`check that product ${name} exists in the ${arr}`);
      const isExist = await this.getProduct(name).isExisting();
      if (!isExist) {
        answ = false;
      }
    });
    return answ;
  }

  async isProductsRemoved() {
    let answ = true;
    await this.removeButtons.forEach(async (element) => {
      logger.info(`check that product ${element} was removed`);
      logger.debug(`click element ${element}`);
      await element.click();
      const success = await this.successMessage.isDisplayed();
      if (!success) {
        answ = false;
      }
    });
    return answ;
  }
}

module.exports = new ProductComparisonPage();
