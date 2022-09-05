const logger = require('../helpers/logger');

class ProductReturnsPage {
  get reasonForReturn() {
    return $('//input[@value="5"]');
  }

  get detailsTextArea() {
    return $('//textarea[@id="input-comment"]');
  }

  get orderId() {
    return $('//input[@id="input-order-id"]');
  }

  get submitButton() {
    return $('//input[@value="Submit"]');
  }

  get successMessage() {
    return $('//p[contains(text(),"Thank you for submitting your return request")]');
  }

  async clickViewButton(order) {
    logger.info('click view button');
    await $(`(//i[@class="fa fa-eye"])[${order}]`).click();
  }

  async checkingExistingOfOrder(orderId) {
    const oderIdElement = await $(`//td[normalize-space()="${orderId}"]`);
    logger.debug(`get text of order id element ${oderIdElement}`);
    return oderIdElement.getText();
  }
}

module.exports = new ProductReturnsPage();
