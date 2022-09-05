class AffiliateTrackingPage {
  get trackingCode() {
    return $('//textarea[@id="input-code"]');
  }
}

module.exports = new AffiliateTrackingPage();
