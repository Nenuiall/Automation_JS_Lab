const MainPage = require('./main-page');

class LoginPage extends MainPage {
  get email() {
    return $('//input[@id="input-email"]');
  }

  get password() {
    return $('//input[@id="input-password"]');
  }

  get loginButton() {
    return $('//input[@value="Login"]');
  }

  get warningMessage() {
    return $('//div[@class="alert alert-danger alert-dismissible"]');
  }

  get succesMessage() {
    return $('//div[@class="alert alert-success alert-dismissible"]');
  }

  get forgottenPasswordLink() {
    return $('//div[@class="form-group"]//a[normalize-space()="Forgotten Password"]');
  }
}

module.exports = new LoginPage();
