const logger = require('../helpers/logger');
const MainPage = require('./main-page');

class MyWishListPage extends MainPage {
  get successMessage() {
    return $('//div[@class="alert alert-success alert-dismissible"]');
  }

  get closeSuccessMessageButton() {
    return $('//button[normalize-space()="×"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }

  get addToCardButton() {
    return $('//button[@class="btn btn-primary"]');
  }

  async clickRemoveButton(order) {
    logger.info('click remove button');
    await $(`(//a[@class="btn btn-danger"])[${order}]`).click();
  }
}

module.exports = new MyWishListPage();
