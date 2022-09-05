const UserFactory = require('../../../framework/business-objects/user-factory');
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
    await ItemPage.getItem('MacBook Air').click();
    await ItemPage.itemQuantity.setValue(20);
    await ItemPage.addToCartButton.click();
    await HeaderPage.cartButton.click();
    await HeaderPage.cartView.click();
    await MainCartPage.useCouponCodeDropdown.click();
    await MainCartPage.applyCouponCode('HelloWorld');
  });

  afterEach('remove items from cart', async () => {
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    const deleteItemButton = await MainCartPage.getRemoveItemButton(1);
    await deleteItemButton.click();
    await MainCartPage.open('/index.php?route=account/logout');
  });

  it('Message "Success: Your coupon discount has been applied!" was appeared.', async () => {
    const textFromAlertMessage = await MainCartPage.getSuccessAlertMessage();
    expect(textFromAlertMessage).toContain('Success: Your coupon discount has been applied!');
  });

  it('Discount calculated correctly in step 1 (checkout order)', async () => {
    await MainCartPage.checkOutButton.scrollIntoView();
    const valueFromSubTotalField = await MainCartPage.getAmount('Sub-Total:');
    const valueFromCouponHelloWorldField = await MainCartPage.getAmount('Coupon (HelloWorld):');
    const discount = getNumberFromString(await valueFromCouponHelloWorldField.getText());
    const subtotal = getNumberFromString(await valueFromSubTotalField.getText());
    const expectedDiscount = (subtotal / 100) * 15;
    expect(expectedDiscount).toEqual(discount);
  });

  it('Coupon code "HelloWorld" was applied and discount calculated correctly in step 2 (confirmation order)', async () => {
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
    await browser.pause(1000);
    const valueFromSubTotalField = await CheckoutPage.getAmount('Sub-Total:');
    const valueFromCouponHelloWorldField = await CheckoutPage.getAmount('Coupon (HelloWorld):');
    const discount = getNumberFromString(await valueFromCouponHelloWorldField.getText());
    const subtotal = getNumberFromString(await valueFromSubTotalField.getText());
    const expectedDiscount = (subtotal / 100) * 15;
    expect(expectedDiscount).toEqual(discount);
  });
});
