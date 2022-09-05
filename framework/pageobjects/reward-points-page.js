class RewardPointsPage {
  get infoMessage() {
    return $('//td[@class="text-center"]');
  }

  get continueButton() {
    return $('//a[@class="btn btn-primary"]');
  }
}

module.exports = new RewardPointsPage();
