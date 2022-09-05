const { expect } = require('chai');
const ItemPage = require('../../../framework/components/item-page');
const FooterPage = require('../../../framework/components/footer-page');
const BrandsPage = require('../../../framework/pageobjects/brands-page');
const BreadCrumbPage = require('../../../framework/components/bread-crumb-page');

describe('Checking the correct display of brands', () => {
  let brand = '';
  before(async () => {
    await BrandsPage.open('/');
  });

  it('Check Apple brand', async () => {
    brand = 'Apple';
    await FooterPage.brands.click();
    await BrandsPage.getBrand(brand).click();
    await ItemPage.getItem('iPhone').click();
    await ItemPage.getbrandLink(brand).click();
    await expect(await BreadCrumbPage.isLinkCorrect(brand)).to.be.true;
  });

  it('Check Canon brand', async () => {
    brand = 'Canon';
    await FooterPage.brands.click();
    await BrandsPage.getBrand(brand).click();
    await ItemPage.getItem('Canon EOS 5D').click();
    await ItemPage.getbrandLink(brand).click();
    await expect(await BreadCrumbPage.isLinkCorrect(brand)).to.be.true;
  });

  it('Check Hewlett-Packard brand', async () => {
    brand = 'Hewlett-Packard';
    await FooterPage.brands.click();
    await BrandsPage.getBrand(brand).click();
    await ItemPage.getItem('HP LP3065').click();
    await ItemPage.getbrandLink(brand).click();
    await expect(await BreadCrumbPage.isLinkCorrect(brand)).to.be.true;
  });

  it('Check HTC brand', async () => {
    brand = 'HTC';
    await FooterPage.brands.click();
    await BrandsPage.getBrand(brand).click();
    await ItemPage.getItem('HTC Touch HD').click();
    await ItemPage.getbrandLink(brand).click();
    await expect(await BreadCrumbPage.isLinkCorrect(brand)).to.be.true;
  });

  it('Check Palm brand', async () => {
    brand = 'Palm';
    await FooterPage.brands.click();
    await BrandsPage.getBrand(brand).click();
    await ItemPage.getItem('Palm Treo Pro').click();
    await ItemPage.getbrandLink(brand).click();
    await expect(await BreadCrumbPage.isLinkCorrect(brand)).to.be.true;
  });

  it('Check Sony brand', async () => {
    brand = 'Sony';
    await FooterPage.brands.click();
    await BrandsPage.getBrand(brand).click();
    await ItemPage.getItem('Sony VAIO').click();
    await ItemPage.getbrandLink(brand).click();
    await expect(await BreadCrumbPage.isLinkCorrect(brand)).to.be.true;
  });
});
