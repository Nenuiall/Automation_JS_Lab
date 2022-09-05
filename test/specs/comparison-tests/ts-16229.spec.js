const { expect } = require('chai');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const ProductComparisonPage = require('../../../framework/pageobjects/product-comparison-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const { selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');

describe('Product comparison check', () => {
  before(async () => {
    await LoginPage.open('/');
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogin.click();
    await LoginPage.email.setValue('jasur09@gmail.com');
    await LoginPage.password.setValue('jasurerkinov');
    await LoginPage.loginButton.click();
  });

  it('Select iPod Classic to compare ', async () => {
    await HeaderPage.logo.click();
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.showAllMp3Players);
    await ItemPage.getItem('iPod Classic').click();
    await ItemPage.compareThisProductButton.click();
    await ItemPage.successMessage.waitForDisplayed({ timeout: 3000 });
    await expect(await ItemPage.successMessage.isDisplayed()).to.be.true;
  });

  it('Select iPod Nano to compare ', async () => {
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.showAllMp3Players);
    await ItemPage.getItem('iPod Nano').click();
    await ItemPage.compareThisProductButton.click();
    await ItemPage.successMessage.waitForDisplayed({ timeout: 3000 });
    await expect(await ItemPage.successMessage.isDisplayed()).to.be.true;
  });

  it('Check if the product comparison page has the selected products', async () => {
    await ItemPage.successComparisonLink.click();
    await expect(await ProductComparisonPage.isProductsExist(['iPod Classic', 'iPod Nano'])).to.be.true;
    await expect(await ProductComparisonPage.isProductsRemoved(['iPod Classic', 'iPod Nano'])).to.be.true;
    await expect(await ProductComparisonPage.isNoProduct.isDisplayed()).to.be.true;
  });
});
