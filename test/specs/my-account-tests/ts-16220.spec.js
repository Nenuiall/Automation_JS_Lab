const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const AddressFactory = require('../../../framework/business-objects/address-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const AddressBookPage = require('../../../framework/pageobjects/address-book-page');
const AddAddressPage = require('../../../framework/pageobjects/add-addres-page');

describe('Checking the possibility of adding new Address', async () => {
  const { leia } = UserFactory.getValidUsers();
  const { street, city } = AddressFactory.getAddress();

  before(async () => {
    await AccountPage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password1);
  });

  after(async () => {
    await Login.logout();
  });

  it('You can successfully add a new address to the Address Book', async () => {
    await AccountPage.addressBookLink.click();
    await AddressBookPage.newAddressButton.click();
    await AddAddressPage.addNewAddress(leia.firstName, leia.lastName, street, city);

    const expectedMessage = 'Your address has been successfully added';
    const successMessage = await AddressBookPage.successMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });

  it('You should have at least one address in the Address Book', async () => {
    await AddressBookPage.clickDeleteButton(1);
    await browser.acceptAlert();
    await AddressBookPage.warningMessage.waitForExist({ timeout: 5000 });

    const expectedMessage = 'Warning: You must have at least one address!';
    const warningMessage = await AddressBookPage.warningMessage.getText();
    expect(warningMessage).to.equal(expectedMessage);
  });

  it('You can successfully add a default address to the Address Book', async () => {
    await AddressBookPage.newAddressButton.click();
    await AddAddressPage.addNewAddress(leia.firstName, leia.lastName, street, city, 'Yes');

    const expectedMessage = 'Your address has been successfully added';
    const successMessage = await AddressBookPage.successMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });

  it('You can not delete your default address', async () => {
    await AddressBookPage.clickDeleteButton(1);
    await browser.acceptAlert();
    await AddressBookPage.warningMessage.waitForExist({ timeout: 5000 });

    const expectedMessage = 'Warning: You can not delete your default address!';
    const warningMessage = await AddressBookPage.warningMessage.getText();
    expect(warningMessage).to.equal(expectedMessage);
  });

  it('You can delete your default address', async () => {
    await AddressBookPage.clickDeleteButton(2);
    await browser.acceptAlert();
    await AddressBookPage.successMessage.waitForExist({ timeout: 5000 });

    const expectedMessage = 'Your address has been successfully deleted';
    const successMessage = await AddressBookPage.successMessage.getText();
    expect(successMessage).to.equal(expectedMessage);
  });
});
