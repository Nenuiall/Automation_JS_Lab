const MainPage = require('../pageobjects/main-page');

class ItemPage extends MainPage {
  getItem(itemName) {
    return $(`//div[@class="caption"]//a[contains(text(), "${itemName}")]`);
  }

  get itemPrice() {
    return $('ul[class="list-inline price"] li h2');
  }

  get itemInfo() {
    return $$('//ul[@class="list-unstyled p-info"]//li');
  }

  get itemShareButton() {
    return $('.atc_s.addthis_button_compact');
  }

  get itemQuantity() {
    return $('#input-quantity');
  }

  get addToCartButton() {
    return $('#button-cart');
  }

  get addToWishListButton() {
    return $('//button[@title="Add to Wish List"]');
  }

  get compareThisProductButton() {
    return $('//button[@title="Compare this Product"]');
  }

  get description() {
    return $('a[href="#tab-description"]');
  }

  getbrandLink(brand) {
    return $(`//a[contains(text(),'${brand}')]`);
  }

  // Review //
  get review() {
    return $('a[href="#tab-review"]');
  }

  get reviewerName() {
    return $('#input-name');
  }

  get reviewTextArea() {
    return $('#input-review');
  }

  getReviewRating(value) {
    return $(`//div[@class="form-group required"]//input[@value="${value}"]`);
  }

  get reviewConfirmButton() {
    return $('#button-review');
  }
  // Review //

  get successMessage() {
    return $('.alert.alert-success.alert-dismissible');
  }

  get successComparisonLink() {
    return $('//a[contains(text(), "product comparison")]');
  }

  get cartInSuccessMessage() {
    return $('//a[contains(text(), "shopping cart")]');
  }

  async getItemInfoInObj() {
    const infoElementsArr = [];
    const infoElementsObj = {};
    await this.itemInfo.forEach(async (info) => {
      infoElementsArr.push(await info.getText());
    });
    await infoElementsArr.forEach(async (info) => {
      const [infoName, value] = info.split(': ');
      infoElementsObj[infoName] = value;
    });
    return infoElementsObj;
  }

  async writeReview(name, text) {
    await this.getItem('iPhone').click();
    await this.review.click();
    await this.reviewerName.setValue(name);
    await this.reviewTextArea.setValue(text);
    await this.getReviewRating(3).click();
    await this.reviewConfirmButton.click();
    return this.reviewMessage.getText();
  }

  get reviewMessage() {
    return $('.desc-wrap .alert-dismissible');
  }
}

module.exports = new ItemPage();
