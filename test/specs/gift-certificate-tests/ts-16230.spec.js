const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const FooterPage = require('../../../framework/components/footer-page');
const GiftCertificatePage = require('../../../framework/pageobjects/gift-certificat-page');

describe('Checking the possibility of Purchasing a gift certificate', () => {
  const recipient = UserFactory.getRandomInvalidUser();
  const sender = UserFactory.getRandomInvalidUser();
  let expectedText;
  let actualText;

  before(() => {
    GiftCertificatePage.open('/');
  });

  it('Amount less than expected', async () => {
    await FooterPage.giftCertificates.click();
    await GiftCertificatePage.recipientName.setValue(recipient.firstName);
    await GiftCertificatePage.recipientEmail.setValue(recipient.userName);
    await GiftCertificatePage.yourName.setValue(sender.firstName);
    await GiftCertificatePage.yourEmail.setValue(sender.userName);
    await GiftCertificatePage.getCertificateTheme('Birthday').click();
    await GiftCertificatePage.amount.setValue('0.5');
    await GiftCertificatePage.agreementCheckbox.click();
    await GiftCertificatePage.continueButton.click();
    expectedText = 'Amount must be between $1.00 and $1,000.00!';
    actualText = await GiftCertificatePage.dangerText.getText();
    await expect(actualText).to.equal(expectedText);
  });

  it('Amount more than expected', async () => {
    await GiftCertificatePage.amount.setValue('1001');
    await GiftCertificatePage.continueButton.click();
    expectedText = 'Amount must be between $1.00 and $1,000.00!';
    actualText = await GiftCertificatePage.dangerText.getText();
    await expect(actualText).to.equal(expectedText);
  });

  it('String invalid value for amount', async () => {
    await GiftCertificatePage.amount.setValue('ten');
    await GiftCertificatePage.continueButton.click();
    expectedText = 'Amount must be between $1.00 and $1,000.00!';
    actualText = await GiftCertificatePage.dangerText.getText();
    await expect(actualText).to.equal(expectedText);
  });

  it('Input suitable value to the amount', async () => {
    await GiftCertificatePage.amount.setValue('100');
    await GiftCertificatePage.continueButton.click();
    expectedText = 'Thank you for purchasing a gift certificate!';
    actualText = await GiftCertificatePage.successMessage.getText();
    await expect(actualText).to.include(expectedText);
  });
});
