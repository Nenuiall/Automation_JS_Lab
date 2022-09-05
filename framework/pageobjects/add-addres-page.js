const logger = require('../helpers/logger');

class AddAddressPage {
  get firstNameField() {
    return $('//input[@id="input-firstname"]');
  }

  get lastNameField() {
    return $('//input[@id="input-lastname"]');
  }

  get companyField() {
    return $('//input[@id="input-company"]');
  }

  get address1Field() {
    return $('//input[@id="input-address-1"]');
  }

  get address2Field() {
    return $('//input[@id="input-address-2"]');
  }

  get cityField() {
    return $('//input[@id="input-city"]');
  }

  get postCodeField() {
    return $('//input[@id="input-postcode"]');
  }

  get countrySelectMenu() {
    return $('//select[@id="input-country"]');
  }

  get countryBelarusOption() {
    return $('//option[@value="20"]');
  }

  get countryCanadaOption() {
    return $('//option[@value="38"]');
  }

  get regionSelectMenu() {
    return $('//select[@id="input-zone"]');
  }

  get regionOption() {
    return $('//option[@value="339"]');
  }

  get defaultAddressOptionYes() {
    return $('//input[@value="1"]');
  }

  get defaultAddressOptionNo() {
    return $('//input[@value="0"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }

  async addNewAddress(firstName, lastName, address1, city, defaultAddress = 'No') {
    logger.info('fill in the address form');
    logger.debug(`set value ${firstName} to the input field ${this.firstNameField}`);
    await this.firstNameField.setValue(firstName);
    logger.debug(`set value ${lastName} to the input field ${this.lastNameField}`);
    await this.lastNameField.setValue(lastName);
    logger.debug(`set value ${address1} to the input field ${this.address1Field}`);
    await this.address1Field.setValue(address1);
    logger.debug(`set value ${city} to the input field ${this.cityField}`);
    await this.cityField.setValue(city);
    logger.debug(`click country select menu ${this.countrySelectMenu}`);
    await this.countrySelectMenu.click();
    logger.debug(`click country option ${this.countryBelarusOption}`);
    await this.countryBelarusOption.click();
    logger.debug(`click region select menu ${this.regionSelectMenu}`);
    await this.regionSelectMenu.click();
    logger.debug(`click region option ${this.regionOption}`);
    await this.regionOption.click();
    if (defaultAddress === 'Yes') {
      logger.debug(`click default address option 'Yes' ${this.defaultAddressOptionYes}`);
      await this.defaultAddressOptionYes.click();
    } else {
      logger.debug(`click default address option 'No' ${this.defaultAddressOptionNo}`);
      await this.defaultAddressOptionNo.click();
    }
    logger.debug(`click continue button ${this.continueButton}`);
    await this.continueButton.click();
  }
}

module.exports = new AddAddressPage();
