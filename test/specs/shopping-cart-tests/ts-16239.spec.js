const UserFactory = require('../../../framework/business-objects/user-factory');
const AddressFactory = require('../../../framework/business-objects/address-factory');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const { selectAndClickElementInDropdown, getNumberFromString } = require('../../../framework/helpers/utilities');

describe('Verify that we can change "shipping estimate"', async () => {
  beforeEach('initial steps', async () => {
    const { peter } = UserFactory.getValidUsers();
    await MainCartPage.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.tablets);
    await ItemPage.getItem('Samsung Galaxy Tab 10.1').click();
    await ItemPage.itemQuantity.setValue(10);
    await ItemPage.addToCartButton.click();
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
  });

  afterEach('remove items from cart', async () => {
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    const deleteItemButton = await MainCartPage.getRemoveItemButton(1);
    await deleteItemButton.click();
    await MainCartPage.open('/index.php?route=account/logout');
  });

  it('Message "Success: estimate has been applied!" - was appeared', async () => {
    const { albania } = AddressFactory.getShippingEstimateAddress();
    const { postCode } = AddressFactory.getAddress();
    await MainCartPage.estimateShippingTaxesDropdown.click();
    await MainCartPage.changeShippingEstimate(albania.country, albania.region, postCode);
    await MainCartPage.flatShippingRateCheckBox.click();
    await MainCartPage.applyShippingButton.click();
    const alertMessage = await MainCartPage.successAlertMessage.getText();
    expect(alertMessage).toContain('Success: Your shipping estimate has been applied!');
  });

  it('Flat Shipping is $5.00 with region Albania', async () => {
    const { albania } = AddressFactory.getShippingEstimateAddress();
    const { postCode } = AddressFactory.getAddress();
    await MainCartPage.estimateShippingTaxesDropdown.click();
    await MainCartPage.changeShippingEstimate(albania.country, albania.region, postCode);
    await MainCartPage.flatShippingRateCheckBox.click();
    await MainCartPage.applyShippingButton.click();
    const valueFromFlatShippingRate = await MainCartPage.getAmount('Flat Shipping Rate:');
    const flatShippingRate = getNumberFromString(await valueFromFlatShippingRate.getText());
    expect(flatShippingRate).toEqual(5);
  });

  it('Flat Shipping is $6.00 with region Belarus', async () => {
    const { belarus } = AddressFactory.getShippingEstimateAddress();
    const { postCode } = AddressFactory.getAddress();
    await MainCartPage.estimateShippingTaxesDropdown.click();
    await MainCartPage.changeShippingEstimate(belarus.country, belarus.region, postCode);
    await MainCartPage.flatShippingRateCheckBox.click();
    await MainCartPage.applyShippingButton.click();
    const valueFromFlatShippingRate = await MainCartPage.getAmount('Flat Shipping Rate:');
    const flatShippingRate = getNumberFromString(await valueFromFlatShippingRate.getText());
    expect(flatShippingRate).toEqual(6);
  });
});
