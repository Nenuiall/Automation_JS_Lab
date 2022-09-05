const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const AffiliatePage = require('../../../framework/pageobjects/affiliate-page');

describe('Checking the possibility of registration of an Affiliate account', async () => {
  const { leia } = UserFactory.getValidUsers();

  before(async () => {
    await AffiliatePage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password2);
  });

  after(async () => {
    await Login.logout();
  });

  it('You can successfully register an Affiliate account', async () => {
    await AccountPage.registerAffiliateAccountLink.click();
    await AffiliatePage.companyField.setValue(leia.company);
    await AffiliatePage.webSiteField.setValue(leia.webSite);
    await AffiliatePage.bankPaymentMethod.click();
    await AffiliatePage.accountName.setValue(leia.userName);
    await AffiliatePage.accountNumber.setValue(leia.telephone);
    await AffiliatePage.agreeAboutUs.click();
    await AffiliatePage.continueButton.click();

    const expectedMessage = 'Success: Your account has been successfully updated.';
    const successMessage = await AccountPage.successMessage.getText();

    expect(successMessage).to.contain(expectedMessage);
  });
});
