const LoginPage = require('../pageobjects/login-page');
const HeaderPage = require('../components/header-page');

class Login {
  async loginAsRegisteredUser(userName, password) {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogin.click();
    await LoginPage.email.setValue(userName);
    await LoginPage.password.setValue(password);
    await LoginPage.loginButton.click();
  }

  async logout() {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogout.click();
  }
}

module.exports = new Login();
