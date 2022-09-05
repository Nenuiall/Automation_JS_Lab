class ForgottenPasswordPage {
  get emailField() {
    return $('//input[@id="input-email"]');
  }

  get continueButton() {
    return $('//input[@class="btn btn-primary"]');
  }
}

module.exports = new ForgottenPasswordPage();
