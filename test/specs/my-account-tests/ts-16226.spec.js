const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const AccountDownloadsPage = require('../../../framework/pageobjects/account-downloads-page');
const RewardPointsPage = require('../../../framework/pageobjects/reward-points-page');
const YourTransactionsPage = require('../../../framework/pageobjects/your-transactions-page');
const RecurringPaymentsPage = require('../../../framework/pageobjects/recurring-payments-page');
const SubscriptionPage = require('../../../framework/pageobjects/subscription-page');

describe('Checking the functionality of the links of Account Page not used in previous scenarios', async () => {
  const { leia } = UserFactory.getValidUsers();

  before(async () => {
    await AccountPage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password2);
  });

  after(async () => {
    await Login.logout();
  });

  it('Your Account Downloads list should be empty', async () => {
    await AccountPage.downloadsLink.click();
    const expectedMessage = 'You have not made any previous downloadable orders!';
    const infoMessage = await AccountDownloadsPage.infoMessage.getText();
    expect(infoMessage).to.contain(expectedMessage);
    await AccountDownloadsPage.continueButton.click();
  });

  it('Your should have any reward points', async () => {
    await AccountPage.rewardPointsLink.click();
    const expectedMessage = 'You do not have any reward points!';
    const infoMessage = await RewardPointsPage.infoMessage.getText();
    expect(infoMessage).to.contain(expectedMessage);
    await RewardPointsPage.continueButton.click();
  });

  it('Your should have any transactions', async () => {
    await AccountPage.transactionsLink.click();
    const expectedMessage = 'You do not have any transactions!';
    const infoMessage = await YourTransactionsPage.infoMessage.getText();
    expect(infoMessage).to.contain(expectedMessage);
    await YourTransactionsPage.continueButton.click();
  });

  it('Your Recurring Payments list should be empty', async () => {
    await AccountPage.recurringPaymentsLink.click();
    const expectedMessage = 'No recurring payments found!';
    const infoMessage = await RecurringPaymentsPage.infoMessage.getText();
    expect(infoMessage).to.contain(expectedMessage);
    await RecurringPaymentsPage.continueButton.click();
  });

  it('You should successfully subscribe to newsletter', async () => {
    await AccountPage.subscriptionLink.click();
    await SubscriptionPage.subscriptionYes.click();
    await SubscriptionPage.continueButton.click();

    const expectedMessage = 'Success: Your newsletter subscription has been successfully updated!';
    const successMessage = await AccountPage.successMessage.getText();
    expect(successMessage).to.contain(expectedMessage);
  });
});
