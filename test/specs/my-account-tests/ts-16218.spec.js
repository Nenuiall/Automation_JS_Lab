const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const HeaderPage = require('../../../framework/components/header-page');
const RegisterPage = require('../../../framework/pageobjects/register-page');
const AccountPage = require('../../../framework/pageobjects/account-page');

describe('Checking the possibility of registering a new user with valid data', async () => {
  const myUser = UserFactory.getValidUsers();

  it('Registration should be successful with valid data', async () => {
    await AccountPage.open('/');
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownRegister.click();

    await RegisterPage.firstNameField.setValue(myUser.leia.firstName);
    await RegisterPage.lastNameField.setValue(myUser.leia.lastName);
    await RegisterPage.emailField.setValue(myUser.leia.userName);
    await RegisterPage.phoneField.setValue(myUser.leia.telephone);
    await RegisterPage.passwordField.setValue(myUser.leia.password1);
    await RegisterPage.passwordConfirmField.setValue(myUser.leia.password1);
    await RegisterPage.privacyPolicyAgree.click();
    await RegisterPage.continueButton.click();

    const expectedMessage = 'Your Account Has Been Created!';
    const successMessage = await AccountPage.createdAccountMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });

  it('You can logout successfully', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogout.click();

    const expectedMessage = 'You have been logged off your account';
    const logoutMessage = await AccountPage.logoutMessage.getText();

    expect(logoutMessage).to.contain(expectedMessage);
  });
});
