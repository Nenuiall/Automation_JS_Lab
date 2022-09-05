const MainPage = require('./main-page');

class AccountPage extends MainPage {
  get addressBookLink() {
    return $('//a[normalize-space()="Address Book"]');
  }

  get mainPageLink() {
    return $('//img[@title="Awesome Shop"]');
  }

  get successMessage() {
    return $('//div[@class="alert alert-success alert-dismissible"]');
  }

  get createdAccountMessage() {
    return $('//h1[normalize-space()="Your Account Has Been Created!"]');
  }

  get logoutMessage() {
    return $('//p[contains(text(),"You have been logged off your account")]');
  }

  get modificationOfAddressBookLink() {
    return $('//a[normalize-space()="Modify your address book entries"]');
  }

  get editAccountInformationLink() {
    return $('//a[normalize-space()="Edit your account information"]');
  }

  get changePasswordLink() {
    return $('//a[normalize-space()="Change your password"]');
  }

  get modificationOfWishListLink() {
    return $('//a[normalize-space()="Modify your wish list"]');
  }

  get orderHistoryListLink() {
    return $('//a[normalize-space()="View your order history"]');
  }

  get returnRequestsLink() {
    return $('//a[normalize-space()="View your return requests"]');
  }

  get registerAffiliateAccountLink() {
    return $('//a[normalize-space()="Register for an affiliate account"]');
  }

  get editingAffiliateAccountLink() {
    return $('//a[normalize-space()="Edit your affiliate information"]');
  }

  get customAffiliateCodeLink() {
    return $('//a[normalize-space()="Custom Affiliate Tracking Code"]');
  }

  get downloadsLink() {
    return $('//div[@id="content"]//a[normalize-space()="Downloads"]');
  }

  get rewardPointsLink() {
    return $('//a[normalize-space()="Your Reward Points"]');
  }

  get transactionsLink() {
    return $('//a[normalize-space()="Your Transactions"]');
  }

  get recurringPaymentsLink() {
    return $('//a[normalize-space()="Recurring payments"]');
  }

  get subscriptionLink() {
    return $('//a[normalize-space()="Subscribe / unsubscribe to newsletter"]');
  }
}

module.exports = new AccountPage();
