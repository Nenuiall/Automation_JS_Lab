const logger = require('../helpers/logger');

class ChangePasswordPage {
  get password() {
    return $('//input[@id="input-password"]');
  }

  get passwordConfirm() {
    return $('//input[@id="input-confirm"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }

  async changePassword(newPassword) {
    logger.info('fill in the password form');
    logger.debug(`set value ${newPassword} to the input field ${this.password}`);
    await this.password.setValue(newPassword);
    logger.debug(`set value ${newPassword} to the input field ${this.passwordConfirm}`);
    await this.passwordConfirm.setValue(newPassword);
    logger.debug(`click continue button ${this.continueButton}`);
    await this.continueButton.click();
  }
}

module.exports = new ChangePasswordPage();
