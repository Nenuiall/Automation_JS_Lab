const logger = require('../helpers/logger');

class MyAccountInformationPage {
  get email() {
    return $('//input[@id="input-email"]');
  }

  get lastName() {
    return $('//input[@id="input-lastname"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }

  async changeEmailValue(newEmail) {
    logger.info('change email value');
    logger.debug(`clear the email input field ${this.email}`);
    await this.email.clearValue();
    logger.debug(`set ${newEmail} to the email input field ${this.email}`);
    await this.email.setValue(newEmail);
    logger.debug(`click continue button ${this.continueButton}`);
    await this.continueButton.click();
  }
}

module.exports = new MyAccountInformationPage();
