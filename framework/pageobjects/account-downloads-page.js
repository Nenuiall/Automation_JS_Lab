class AccountDownloadsPage {
  get infoMessage() {
    return $('//p[contains(text(),"You have not made any previous downloadable orders")]');
  }

  get continueButton() {
    return $('//a[@class="btn btn-primary"]');
  }
}

module.exports = new AccountDownloadsPage();
