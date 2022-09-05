const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const AddressFactory = require('../../../framework/business-objects/address-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const MyAccountInformationPage = require('../../../framework/pageobjects/my-account-information-page');
const ChangePasswordPage = require('../../../framework/pageobjects/change-password-page');
const AddressBookPage = require('../../../framework/pageobjects/address-book-page');
const AddAddressPage = require('../../../framework/pageobjects/add-addres-page');

describe('Checking the possibility of changing the Account data', async () => {
  const { leia } = UserFactory.getValidUsers();
  const { street, city } = AddressFactory.getAddress();

  before(async () => {
    await AccountPage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password1);
  });

  after(async () => {
    await Login.logout();
  });

  it('You can successfully change your personal information', async () => {
    await AccountPage.editAccountInformationLink.click();
    await MyAccountInformationPage.lastName.clearValue();
    await MyAccountInformationPage.lastName.setValue('Skywalker');
    await MyAccountInformationPage.continueButton.click();

    const expectedMessage = 'Success: Your account has been successfully updated.';
    const successMessage = await AccountPage.successMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });

  it('You can successfully change your password', async () => {
    await AccountPage.changePasswordLink.click();
    await ChangePasswordPage.password.setValue(leia.password2);
    await ChangePasswordPage.passwordConfirm.setValue(leia.password2);
    await ChangePasswordPage.continueButton.click();

    const expectedMessage = 'Success: Your password has been successfully updated.';
    const successMessage = await AccountPage.successMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });

  it('You can successfully change your address book entries', async () => {
    await AccountPage.modificationOfAddressBookLink.click();
    await AddressBookPage.clickEditButton(1);
    await AddAddressPage.address1Field.clearValue();
    await AddAddressPage.address1Field.setValue(street);
    await AddAddressPage.cityField.clearValue();
    await AddAddressPage.cityField.setValue(city);
    await AddAddressPage.continueButton.click();

    const expectedMessage = 'Your address has been successfully updated';
    const successMessage = await AddressBookPage.successMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });
});
