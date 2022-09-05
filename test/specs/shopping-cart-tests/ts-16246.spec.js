const UserFactory = require('../../../framework/business-objects/user-factory');
const HomePage = require('../../../framework/pageobjects/home-page');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const CheckoutPage = require('../../../framework/pageobjects/checkout-page');
const { getNumberFromString, selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');

describe('Verify that coupon "HelloWorld"(discount 15%) works for registered user', async () => {
  beforeEach('initial common steps', async () => {
    const { peter } = UserFactory.getValidUsers();
    await MainCartPage.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await selectAndClickElementInDropdown(HeaderPage.desktops, HeaderPage.showAllDesktops);
    await HomePage.macBookItem.click();
    await ItemPage.itemQuantity.setValue(20);
    await ItemPage.addToCartButton.click();
    await HeaderPage.cartButton.click();
    await HeaderPage.cartView.click();
    await MainCartPage.useCouponCodeDropdown.click();
    await MainCartPage.applyCouponCode('IDDQD');
  });

  afterEach('remove items from cart', async () => {
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    const deleteItemButton = await MainCartPage.getRemoveItemButton(1);
    await deleteItemButton.click();
    await MainCartPage.open('/index.php?route=account/logout');
  });

  it('Message "Success: Your coupon discount has been applied!" was appeared.', async () => {
    const textFromAlertMessage = await MainCartPage.successAlertMessage.getText();
    expect(textFromAlertMessage).toContain('Success: Your coupon discount has been applied!');
  });

  it('Coupon code "IDDQD" was applied', async () => {
    await MainCartPage.checkOutButton.scrollIntoView();
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.existingAddressCheckbox.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.cashOnDeliveryCheckbox.click();
    await CheckoutPage.iHaveReadAndAgreeInput.click();
    await CheckoutPage.currentContinueButton.scrollIntoView();
    await CheckoutPage.currentContinueButton.click();
    const valueFromSubTotal = await CheckoutPage.getAmount('Total:');
    const valueFromSubTotalField = await CheckoutPage.getAmount('Sub-Total:');
    const valueFromVat = await CheckoutPage.getAmount('VAT (20%):');
    const vat = getNumberFromString(await valueFromVat.getText());
    const subtotal = getNumberFromString(await valueFromSubTotalField.getText());
    const total = getNumberFromString(await valueFromSubTotal.getText());
    const expectedTotalWithoutFlatShippingRateTax = subtotal + vat;
    expect(expectedTotalWithoutFlatShippingRateTax).toEqual(total);
  });

  it('discounted "Flat Shipping Rate is $-5', async () => {
    await MainCartPage.checkOutButton.scrollIntoView();
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.existingAddressCheckbox.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.cashOnDeliveryCheckbox.click();
    await CheckoutPage.iHaveReadAndAgreeInput.click();
    await CheckoutPage.currentContinueButton.scrollIntoView();
    await CheckoutPage.currentContinueButton.click();
    const valueFromCouponField = await CheckoutPage.getAmount('Coupon (IDDQD):');
    const discount = await valueFromCouponField.getText();
    expect(discount).toEqual('$-5.00');
  });
});
