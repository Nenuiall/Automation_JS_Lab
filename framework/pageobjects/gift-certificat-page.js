const MainPage = require('./main-page');

class GiftCertificatePage extends MainPage {
  get recipientName() {
    return $('#input-to-name');
  }

  get recipientEmail() {
    return $('#input-to-email');
  }

  get yourName() {
    return $('#input-from-name');
  }

  get yourEmail() {
    return $('#input-from-email');
  }

  getCertificateTheme(type) {
    return $(`//label[normalize-space()="${type}"]`);
  }

  get message() {
    return $('#input-message');
  }

  get amount() {
    return $('#input-amount');
  }

  get agreementCheckbox() {
    return $('//input[@name="agree"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }

  get dangerText() {
    return $('.text-danger');
  }

  get successMessage() {
    return $('div[id="content"] p');
  }
}

module.exports = new GiftCertificatePage();
