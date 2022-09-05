const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const HeaderPage = require('../../../framework/components/header-page');
const LoginPage = require('../../../framework/pageobjects/login-page');

describe('Checking the possibility of login with wrong data', async () => {
  const myUser = UserFactory.getValidUsers();

  before(async () => {
    await HeaderPage.open('/');
  });

  it('You can not login with wrong password', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogin.click();
    await LoginPage.email.setValue(myUser.leia.userName);
    await LoginPage.password.setValue('0000');
    await LoginPage.loginButton.click();

    const expectedMessage = 'Warning: No match for E-Mail Address and/or Password.';
    const warningMessage = await LoginPage.warningMessage.getText();
    expect(warningMessage).to.equal(expectedMessage);
  });

  it('You can not login with wrong email', async () => {
    await LoginPage.email.setValue('blabla@mail.ru');
    await LoginPage.password.setValue(myUser.leia.password1);
    await LoginPage.loginButton.click();

    const expectedMessage = 'Warning: No match for E-Mail Address and/or Password.';
    const warningMessage = await LoginPage.warningMessage.getText();
    expect(warningMessage).to.equal(expectedMessage);
  });
});
