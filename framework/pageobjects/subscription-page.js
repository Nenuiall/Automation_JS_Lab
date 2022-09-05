class SubscriptionPage {
  get subscriptionYes() {
    return $('//input[@value="1"]');
  }

  get subscriptionNo() {
    return $('//input[@value="0"]');
  }

  get continueButton() {
    return $('//input[@value="Continue"]');
  }
}

module.exports = new SubscriptionPage();
