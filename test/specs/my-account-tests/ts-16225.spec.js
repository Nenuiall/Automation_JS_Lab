const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const AffiliatePage = require('../../../framework/pageobjects/affiliate-page');
const AffiliateTrackingPage = require('../../../framework/pageobjects/affiliate-tracking-page');

describe('Checking the possibility of changing the Affiliate account', async () => {
  const { leia } = UserFactory.getValidUsers();

  before(async () => {
    await AffiliatePage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password2);
  });

  after(async () => {
    await Login.logout();
  });

  it('You can successfully change your Affiliate account data', async () => {
    await AccountPage.editingAffiliateAccountLink.click();
    await AffiliatePage.payPalPaymentMethod.click();
    await AffiliatePage.payPalEmailAccount.setValue(myUser.leia.userName);
    await AffiliatePage.continueButton.click();

    const expectedMessage = 'Success: Your account has been successfully updated.';
    const successMessage = await AccountPage.successMessage.getText();

    expect(successMessage).to.contain(expectedMessage);
  });

  it('Your Affiliate Tracking Code should be generated', async () => {
    await AccountPage.customAffiliateCodeLink.click();

    const trackingCode = await AffiliateTrackingPage.trackingCode.getText();
    // eslint-disable-next-line no-unused-expressions
    expect(trackingCode).is.not.empty;
  });
});
