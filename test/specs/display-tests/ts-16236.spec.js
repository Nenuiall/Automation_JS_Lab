const { expect } = require('chai');
const HeaderPage = require('../../../framework/components/header-page');
const FooterPage = require('../../../framework/components/footer-page');
const BreadCrumbPage = require('../../../framework/components/bread-crumb-page');
const LoginPage = require('../../../framework/pageobjects/login-page');

// const pastebinPage = new PastebinPage();

describe('Сhecking the correctness of links on Footer', () => {
  before(async () => {
    await HeaderPage.open('/');
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownLogin.click();
    await LoginPage.email.setValue('jasur09@gmail.com');
    await LoginPage.password.setValue('jasurerkinov');
    await LoginPage.loginButton.click();
  });

  it('Check About Us link', async () => {
    await FooterPage.aboutUs.click();
    await expect(await BreadCrumbPage.isLinkCorrect('About Us')).to.be.true;
  });

  it('Check Delivery Information link', async () => {
    await FooterPage.deliveryInformation.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Delivery Information')).to.be.true;
  });

  it('Check Privacy Policy link', async () => {
    await FooterPage.privacyPolicy.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Privacy Policy')).to.be.true;
  });

  it('Check Terms & Conditions link', async () => {
    await FooterPage.termsConditions.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Terms & Conditions')).to.be.true;
  });

  it('Check Contact Us link', async () => {
    await FooterPage.contactUs.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Contact Us')).to.be.true;
  });

  it('Check Returns link', async () => {
    await FooterPage.returns.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Product Returns')).to.be.true;
  });

  it('Check Site Map link', async () => {
    await FooterPage.siteMap.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Site Map')).to.be.true;
  });

  it('Check Brands link', async () => {
    await FooterPage.brands.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Brand')).to.be.true;
  });

  it('Check Gift Certificates link', async () => {
    await FooterPage.giftCertificates.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Gift Certificate')).to.be.true;
  });

  it('Check Affiliate link', async () => {
    await FooterPage.affiliate.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Account')).to.be.true;
  });

  it('Check Specials link', async () => {
    await FooterPage.specials.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Special Offers')).to.be.true;
  });

  it('Check My Account link', async () => {
    await FooterPage.myAccount.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Account')).to.be.true;
  });

  it('Check Order History link', async () => {
    await FooterPage.orderHistory.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Order History')).to.be.true;
  });

  it('Check Wish List link', async () => {
    await FooterPage.wishList.click();
    await expect(await BreadCrumbPage.isLinkCorrect('My Wish List')).to.be.true;
  });

  it('Check Newsletter link', async () => {
    await FooterPage.newsletter.click();
    await expect(await BreadCrumbPage.isLinkCorrect('Newsletter')).to.be.true;
  });
});
