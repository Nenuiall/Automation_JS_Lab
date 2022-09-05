const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const HeaderPage = require('../../../framework/components/header-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const ForgottenPasswordPage = require('../../../framework/pageobjects/forgotten-password-page');
const InboxPage = require('../../../framework/pageobjects/inbox-page');

describe('Checking the functionality of password recovery', async () => {
  const { leia } = UserFactory.getValidUsers();

  before(async () => {
    await LoginPage.open('/');
  });

  it('Email with a confirmation link should be sent to your email address', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogin.click();
    await LoginPage.forgottenPasswordLink.click();
    await ForgottenPasswordPage.emailField.setValue(leia.userName);
    await ForgottenPasswordPage.continueButton.click();

    const expectedMessage = 'An email with a confirmation link has been sent your email address.';
    const infoMessage = await LoginPage.succesMessage.getText();
    expect(infoMessage).to.equal(expectedMessage);
  });

  it('You should receive an email with a confirmation link', async () => {
    await InboxPage.openInbox(leia.userName);

    const expectedCountOfMails = '1 mail';
    const countOfMailsInTheBox = await InboxPage.countOfMails.getText();
    expect(countOfMailsInTheBox).to.equal(expectedCountOfMails);
  });
});
