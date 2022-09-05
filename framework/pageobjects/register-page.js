const MainPage = require('./main-page');

const logger = require('../helpers/logger');

class RegisterPage extends MainPage {
  get firstNameField() {
    return $('//input[@id="input-firstname"]');
  }

  get lastNameField() {
    return $('//input[@id="input-lastname"]');
  }

  get emailField() {
    return $('//input[@id="input-email"]');
  }

  get phoneField() {
    return $('//input[@id="input-telephone"]');
  }

  get passwordField() {
    return $('//input[@id="input-password"]');
  }

  get passwordConfirmField() {
    return $('//input[@id="input-confirm"]');
  }

  get privacyPolicyAgree() {
    return $('//input[@name="agree"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }

  get firstInvalidPasswordMessage() {
    return $('//div[contains(text(),"Password must be between")]');
  }

  get secondInvalidPasswordMessage() {
    return $('//div[contains(text(),"Password confirmation does")]');
  }

  get succesMessage() {
    return $('//h1[normalize-space()="Your Account Has Been Created!"]');
  }

  get logoutLink() {
    return $('//a[@class="list-group-item"][normalize-space()="Logout"]');
  }

  get logoutMessage() {
    return $('//p[contains(text(),"You have been logged off your account")]');
  }

  async fiilInRegisterationData(firstName, lastName, email, phone, password) {
    logger.info('fill in the registration form');
    logger.debug(`set value ${firstName} to the input field ${this.firstNameField}`);
    await this.firstNameField.setValue(firstName);
    logger.debug(`set value ${lastName} to the input field ${this.lastNameField}`);
    await this.lastNameField.setValue(lastName);
    logger.debug(`set value ${email} to the input field ${this.emailField}`);
    await this.emailField.setValue(email);
    logger.debug(`set value ${phone} to the input field ${this.phoneField}`);
    await this.phoneField.setValue(phone);
    logger.debug(`set value ${password} to the input field ${this.passwordField}`);
    await this.passwordField.setValue(password);
    logger.debug(`set value ${password} to the input field ${this.passwordConfirmField}`);
    await this.passwordConfirmField.setValue(password);
    logger.debug(`click privacy checkbox ${this.privacyPolicyAgree}`);
    await this.privacyPolicyAgree.click();
    logger.debug(`click continue button ${this.continueButton}`);
    await this.continueButton.click();
  }
}

module.exports = new RegisterPage();
