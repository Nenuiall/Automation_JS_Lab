const UserFactory = require('../../../framework/business-objects/user-factory');
const CheckoutPage = require('../../../framework/pageobjects/checkout-page');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const PaymentViaPayPalPage = require('../../../framework/pageobjects/payment-via-paypal-page');
const { selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');

describe('Verify that we can use the PayPal method to pay for our items', async () => {
  it('Order has been placed!', async () => {
    const { peter } = UserFactory.getValidUsers();
    await PaymentViaPayPalPage.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await HeaderPage.phonesPdas.click();
    await ItemPage.getItem('iPhone').click();
    await ItemPage.itemQuantity.setValue(10);
    await ItemPage.addToCartButton.click();
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    await MainCartPage.checkOutButton.scrollIntoView();
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.existingAddressCheckbox.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.payPalExpressCheckoutCheckbox.click();
    await CheckoutPage.iHaveReadAndAgreeInput.click();
    await CheckoutPage.currentContinueButton.scrollIntoView();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.payViaPayPalButton.click();
    await PaymentViaPayPalPage.switchWindow('PayPal');
    await PaymentViaPayPalPage.login(peter.payPalUserName, peter.payPalPassword);
    await PaymentViaPayPalPage.payNowButton.click();
    await PaymentViaPayPalPage.switchWindow('Checkout');
    await PaymentViaPayPalPage.switchWindow('success');
    const yourOrderHasBeenPlacedMessage = await MainCartPage.yourOrderHasBeenPlacedMessage.getText();
    expect(yourOrderHasBeenPlacedMessage).toContain('Your order has been placed!');
  });
});
