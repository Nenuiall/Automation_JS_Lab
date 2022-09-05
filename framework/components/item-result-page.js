class ItemResultPage {
  get displayListButton() {
    return $('.fa.fa-th-list');
  }

  get displayGridButton() {
    return $('.fa.fa-th');
  }

  get productCompare() {
    return $('#compare-total');
  }

  async chooseSotrBy(type) {
    await $('#input-sort').click();
    await $(`//select[@id="input-sort"]//option[contains(text(), "${type}")]`).click();
  }

  async getItemsNames() {
    const names = await $$('//div[@class="caption"]//h4');
    const result = [];
    for (let i = 0; names.length > i; i += 1) {
      result.push(names[i].getText().toLowerCase());
    }
    return result;
  }

  async getItemsPrices() {
    const prices = $$('//p[@class="price"]');
    const regex = /,|\$|\u20BD|[A-Za-z]/g;
    const result = [];
    await prices.forEach(async (price) => {
      let numPrice = await price.getText();
      numPrice = numPrice.split(' ')[0].replace(regex, '') * 1;
      result.push(numPrice);
    });
    return result;
  }

  async isDisplayedCorrect(type) {
    const displayType = type;
    let correctClassForm;
    let isCorrectlyDisplayed = true;
    switch (displayType) {
      case 'Grid':
        await this.displayGridButton.click();
        correctClassForm = 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12';
        break;
      case 'List':
        await this.displayListButton.click();
        correctClassForm = 'product-layout product-list col-xs-12';
        break;
      default:
        break;
    }
    await this.allProductsSections.forEach(async (element) => {
      const elementClass = await element.getAttribute('class');
      if (!(elementClass === correctClassForm)) {
        isCorrectlyDisplayed = false;
      }
    });
    return isCorrectlyDisplayed;
  }

  get allProductsSections() {
    return $$('#content .row .product-layout'); // for 5 test case
  }
}

module.exports = new ItemResultPage();
