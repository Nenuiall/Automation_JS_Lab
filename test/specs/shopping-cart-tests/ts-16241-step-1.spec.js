const UserFactory = require('../../../framework/business-objects/user-factory');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const { getNumberFromString } = require('../../../framework/helpers/utilities');
const { selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');

describe('Sub-Total, VAT (20%), Total calculate correctly', async () => {
  const receivedValues = {
    total: null,
    subTotal: null,
    vat: null,
    flatShippingRate: null,
    unitPrice: null,
  };

  beforeEach('get Sub-Total, VAT (20%), Total', async () => {
    const { peter } = UserFactory.getValidUsers();
    await MainCartPage.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.showAllMp3Players);
    await ItemPage.getItem('iPod Classic').click();
    await ItemPage.itemQuantity.setValue(10);
    await ItemPage.addToCartButton.click();
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    const valueFromUnitPriceField = await MainCartPage.getUnitPrice(1);
    const valueFromTotalField = await MainCartPage.getAmount('Total:');
    const valueFromVatField = await MainCartPage.getAmount('VAT (20%):');
    const valueFromSubTotalField = await MainCartPage.getAmount('Sub-Total:');
    receivedValues.unitPrice = getNumberFromString(await valueFromUnitPriceField.getText());
    receivedValues.subTotal = getNumberFromString(await valueFromSubTotalField.getText());
    receivedValues.vat = getNumberFromString(await valueFromVatField.getText());
    receivedValues.total = getNumberFromString(await valueFromTotalField.getText());
  });

  afterEach('remove items from cart', async () => {
    receivedValues.total = null;
    receivedValues.subTotal = null;
    receivedValues.vat = null;
    receivedValues.flatShippingRate = null;
    receivedValues.unitPrice = null;
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    const deleteItemButton = await MainCartPage.getRemoveItemButton(1);
    await deleteItemButton.click();
    await MainCartPage.open('/index.php?route=account/logout');
  });

  it('Total should be calculated correctly step 1 (Checkout)', async () => {
    const expectedValue = receivedValues.unitPrice * 10;
    expect(receivedValues.total).toEqual(expectedValue);
  });

  it('Vat should be calculated correctly step 1 (Checkout)', async () => {
    const { total, vat, subTotal } = receivedValues;
    const expectedValue = total - subTotal;
    expect(vat).toEqual(expectedValue);
  });

  it('Sub-total should be calculated correctly step 1 (Checkout)', async () => {
    const { total, vat, subTotal } = receivedValues;
    const expectedValue = total - vat;
    expect(subTotal).toEqual(expectedValue);
  });
});
