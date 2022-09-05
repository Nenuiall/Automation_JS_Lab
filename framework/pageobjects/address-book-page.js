const logger = require('../helpers/logger');

class AddressBookPage {
  get newAddressButton() {
    return $('//a[@class="btn btn-primary"]');
  }

  get successMessage() {
    return $('//div[@class="alert alert-success alert-dismissible"]');
  }

  get warningMessage() {
    return $('//div[@class="alert alert-warning"]');
  }

  async clickDeleteButton(order) {
    logger.debug('click delete button');
    await $(`(//a[@class="btn btn-danger"])[${order}]`).click();
  }

  async clickEditButton(order) {
    logger.debug('click edit button');
    await $(`(//a[@class="btn btn-info"])[${order}]`).click();
  }
}

module.exports = new AddressBookPage();
