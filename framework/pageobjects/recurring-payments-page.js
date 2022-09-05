class RecurringPaymentsPage {
  get infoMessage() {
    return $('//p[normalize-space()="No recurring payments found!"]');
  }

  get continueButton() {
    return $('//a[@class="btn btn-primary"]');
  }
}

module.exports = new RecurringPaymentsPage();
