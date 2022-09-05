const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const HeaderPage = require('../../../framework/components/header-page');
const RegisterPage = require('../../../framework/pageobjects/register-page');

describe('Checking the possibility of registering a new user with invalid password', async () => {
  const myUser = UserFactory.getValidUsers();

  it('Password must be between 4 and 20 characters', async () => {
    await RegisterPage.open('/');
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownRegister.click();

    await RegisterPage.firstNameField.setValue(myUser.leia.firstName);
    await RegisterPage.lastNameField.setValue(myUser.leia.lastName);
    await RegisterPage.emailField.setValue(myUser.leia.userName);
    await RegisterPage.phoneField.setValue(myUser.leia.telephone);
    await RegisterPage.passwordField.setValue('111');
    await RegisterPage.passwordConfirmField.setValue('111');
    await RegisterPage.privacyPolicyAgree.click();
    await RegisterPage.continueButton.click();

    const expectedMessage = 'Password must be between 4 and 20 characters!';
    const warningMessage = await RegisterPage.firstInvalidPasswordMessage.getText();
    expect(warningMessage).to.equal(expectedMessage);
  });

  it('Password confirmation should match password', async () => {
    await RegisterPage.passwordField.clearValue();
    await RegisterPage.passwordField.setValue('1111');
    await RegisterPage.passwordConfirmField.clearValue();
    await RegisterPage.passwordConfirmField.setValue('1234');
    await RegisterPage.continueButton.click();

    const expectedMessage = 'Password confirmation does not match password!';
    const warningMessage = await RegisterPage.secondInvalidPasswordMessage.getText();
    expect(warningMessage).to.equal(expectedMessage);
  });
});
