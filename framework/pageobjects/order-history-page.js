const logger = require('../helpers/logger');

class OrderHistoryPage {
  async clickReturnButton(order) {
    logger.info('click return button');
    return $(`(//a[@data-original-title="Return"])[${order}]`).click();
  }

  async clickViewButton(order) {
    logger.info('click view button');
    await $(`(//i[@class="fa fa-eye"])[${order}]`).click();
  }
}

module.exports = new OrderHistoryPage();
