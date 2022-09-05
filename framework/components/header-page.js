const MainPage = require('../pageobjects/main-page');

class HeaderPage extends MainPage {
  get logo() {
    return $('//img[@title="Awesome Shop"]');
  }

  get desktops() {
    return $('//ul[@class="nav navbar-nav"]//a[contains(text(), "Desktops")]');
  }

  get showAllDesktops() {
    return $('//a[contains(text(), "Show All Desktops")]');
  }

  get laptopsNotebooks() {
    return $('//ul[@class="nav navbar-nav"]//a[contains(text(), "Laptops & Notebooks")]');
  }

  get showAllLaptopsNotebooks() {
    return $('//a[contains(text(), "Show All Laptops & Notebooks")]');
  }

  get components() {
    return $('//ul[@class="nav navbar-nav"]//a[contains(text(), "Components")]');
  }

  get showAllComponents() {
    return $('//a[contains(text(), "Show All Components")]');
  }

  get tablets() {
    return $('//a[contains(text(), "Tablets")]');
  }

  get software() {
    return $('//ul[@class="nav navbar-nav"]//a[contains(text(),"Software")]');
  }

  get phonesPdas() {
    return $('//ul[@class="nav navbar-nav"]//a[contains(text(),"Phones & PDAs")]');
  }

  get cameras() {
    return $('//ul[@class="nav navbar-nav"]//a[normalize-space()="Cameras"]');
  }

  get mp3Players() {
    return $('//ul[@class="nav navbar-nav"]//a[contains(text(),"MP3 Players")]');
  }

  get showAllMp3Players() {
    return $('//a[contains(text(), "Show All MP3 Players")]');
  }

  get searchButton() {
    return $('//div[@class="search-wrap"]//i[@class="fa fa-search"]');
  }

  get searchInput() {
    return $('input[placeholder="Search"]');
  }

  get searchConfirm() {
    return $('button[class="btn btn-lg"]');
  }

  get cartButton() {
    return $('#cart');
  }

  get cartView() {
    return $('.btn.btn-block.btn-default');
  }

  get cartCheckout() {
    return $('.btn.btn-block.btn-primary');
  }

  get dropdownButton() {
    return $('.fa.fa-th-large');
  }

  // My Account //
  get dropdownRegister() {
    return $('//ul[@class="list-unstyled"]//a[contains(text(), "Register")]');
  }

  get dropdownLogin() {
    return $('//ul[@class="list-unstyled"]//a[contains(text(), "Login")]');
  }

  get dropdownMyAccount() {
    return $('//ul//ul[@class="list-unstyled"]//a[contains(text(),"My ")]');
  }

  get dropdownOrderHistory() {
    return $('//ul//ul[@class="list-unstyled"]//a[contains(text(),"Order ")]');
  }

  get dropdownTransactions() {
    return $('//ul//ul[@class="list-unstyled"]//a[contains(text(),"Trans")]');
  }

  get dropdownDownloads() {
    return $('//ul//ul[@class="list-unstyled"]//a[contains(text(),"Downl")]');
  }

  get dropdownLogout() {
    return $('//ul//ul[@class="list-unstyled"]//a[contains(text(),"Logout")]');
  }
  // My Account //

  // Currencies //
  get dropdownBYN() {
    return $('ul[class="dropdown-menu dropdown-menu-right"] a[name="BYN"]');
  }

  get dropdownRUB() {
    return $('ul[class="dropdown-menu dropdown-menu-right"] a[name="RUB"]');
  }

  get dropdownUSD() {
    return $('ul[class="dropdown-menu dropdown-menu-right"] a[name="USD"]');
  }
  // Currencies //

  async useSearch(str) {
    await this.searchButton.click();
    await this.searchInput.setValue(str);
    await this.searchConfirm.click();
  }

  getButtonFromDropdownMenu(item) {
    return $(`//a[contains(text(), "${item}")]`);
  }
}

module.exports = new HeaderPage();
