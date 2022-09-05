const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const OrderHistoryPage = require('../../../framework/pageobjects/order-history-page');
const ShoppingCartPage = require('../../../framework/pageobjects/shopping-cart-page');
const ProductReturnsPage = require('../../../framework/pageobjects/product-returns-page');

describe('Checking the possibility of Returns', async () => {
  const { leia } = UserFactory.getValidUsers();

  before(async () => {
    await ShoppingCartPage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password2);
  });

  after(async () => {
    await Login.logout();
  });

  it('You can successfully add items to the Shopping Cart', async () => {
    await HeaderPage.logo.click();
    await ItemPage.getItem('iPhone').click();
    await ItemPage.addToCartButton.click();

    const expectedMessage = 'Success: You have added iPhone to your shopping cart!';
    const successMessage = await ItemPage.successMessage.getText();

    expect(successMessage).to.contain(expectedMessage);
  });

  it('Your should successfully make an order', async () => {
    await HeaderPage.cartButton.click();
    await HeaderPage.cartView.click();
    await ShoppingCartPage.checkoutButton.click();
    await ShoppingCartPage.billingDetailsContinue.click();
    await ShoppingCartPage.deliveryDetailsContinue.click();
    await ShoppingCartPage.deliveryMethodContinue.click();
    await ShoppingCartPage.cashOnDeliveryOption.click();
    await ShoppingCartPage.termsAndConditionsAgree.click();
    await ShoppingCartPage.paymentMethodContinue.click();
    await ShoppingCartPage.confirmButton.waitForExist({ timeout: 5000 });
    await ShoppingCartPage.confirmButton.click();

    const expectedMessage = 'Your order has been successfully processed';
    await ShoppingCartPage.successMessage.waitForExist({ timeout: 5000 });
    const successMessage = await ShoppingCartPage.successMessage.getText();

    expect(successMessage).to.contain(expectedMessage);
  });

  it('Your should successfully make a return', async () => {
    const detailsForReturn = 'My iPhone can not communicate with Tatooine!';

    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownMyAccount.click();
    await AccountPage.orderHistoryListLink.click();
    await OrderHistoryPage.clickViewButton(1);
    await OrderHistoryPage.clickReturnButton(1);
    await ProductReturnsPage.reasonForReturn.click();
    await ProductReturnsPage.detailsTextArea.setValue(detailsForReturn);
    const orderId = await ProductReturnsPage.orderId.getValue();
    await ProductReturnsPage.submitButton.click();

    const expectedMessage = 'Thank you for submitting your return request';
    const successMessage = await ProductReturnsPage.successMessage.getText();
    expect(successMessage).to.contain(expectedMessage);

    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownMyAccount.click();
    await AccountPage.returnRequestsLink.click();

    const yourReturnOrder = await ProductReturnsPage.checkingExistingOfOrder(orderId);
    expect(yourReturnOrder).to.contain(orderId);
  });
});
