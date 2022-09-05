class FooterPage {
  // Information //
  get aboutUs() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "About Us")]');
  }

  get deliveryInformation() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Delivery Information")]');
  }

  get privacyPolicy() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Privacy Policy")]');
  }

  get termsConditions() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Terms & Conditions")]');
  }
  // Information //

  // Customer Sevice //
  get contactUs() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Contact Us")]');
  }

  get returns() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Returns")]');
  }

  get siteMap() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Site Map")]');
  }
  // Customer Sevice //

  // Extras //
  get brands() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Brands")]');
  }

  get giftCertificates() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Gift Certificates")]');
  }

  get affiliate() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Affiliate")]');
  }

  get specials() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Specials")]');
  }
  // Extras //

  // My Account //
  get myAccount() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "My Account")]');
  }

  get orderHistory() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Order History")]');
  }

  get wishList() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Wish List")]');
  }

  get newsletter() {
    return $('//div[@class="col-sm-3"]//a[contains(text(), "Newsletter")]');
  }
  // My Account //
}

module.exports = new FooterPage();
