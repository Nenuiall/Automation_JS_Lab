const MainPage = require('./main-page');

class BrandsPage extends MainPage {
  getBrand(name) {
    return $(`//a[contains(text(), "${name}")]`);
  }
}

module.exports = new BrandsPage();
