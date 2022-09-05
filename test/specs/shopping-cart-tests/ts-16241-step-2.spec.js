const UserFactory = require('../../../framework/business-objects/user-factory');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const CheckoutPage = require('../../../framework/pageobjects/checkout-page');
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
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.existingAddressCheckbox.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.cashOnDeliveryCheckbox.click();
    await CheckoutPage.iHaveReadAndAgreeInput.click();
    await CheckoutPage.currentContinueButton.scrollIntoView();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.confirmOrderButton.scrollIntoView();
    const valueFromSubTotalField = await CheckoutPage.getAmount('Sub-Total:');
    const valueFromFlatShippingRate = await CheckoutPage.getAmount('Flat Shipping Rate:');
    const valueFromVat = await CheckoutPage.getAmount('VAT (20%):');
    const valueFromTotal = await CheckoutPage.getAmount('Total:');
    receivedValues.flatShippingRate = getNumberFromString(await valueFromFlatShippingRate.getText());
    receivedValues.subTotal = getNumberFromString(await valueFromSubTotalField.getText());
    receivedValues.vat = getNumberFromString(await valueFromVat.getText());
    receivedValues.total = getNumberFromString(await valueFromTotal.getText());
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
    const {
      flatShippingRate, total, subTotal, vat,
    } = receivedValues;
    const expectedValue = flatShippingRate + subTotal + vat;
    expect(total).toEqual(expectedValue);
  });

  it('Vat should be calculated correctly step 2 (Confirm order)', () => {
    const { subTotal, flatShippingRate, vat } = receivedValues;
    const expectedValue = (subTotal + flatShippingRate) / 5;
    expect(vat).toEqual(expectedValue);
  });

  it('Sub-total should be calculated correctly step 2 (Confirm order)', () => {
    const {
      total, vat, subTotal, flatShippingRate,
    } = receivedValues;
    const expectedValue = total - vat - flatShippingRate;
    expect(subTotal).toEqual(expectedValue);
  });
});
