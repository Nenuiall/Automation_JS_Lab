const UserFactory = require('../../../framework/business-objects/user-factory');
const CheckoutPage = require('../../../framework/pageobjects/checkout-page');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const { selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');

describe('Verify that we have all the steps in the checkout', async () => {
  beforeEach('initial steps', async () => {
    const { peter } = UserFactory.getValidUsers();
    await MainCartPage.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await selectAndClickElementInDropdown(HeaderPage.desktops, HeaderPage.showAllDesktops);
    await ItemPage.getItem('MacBook').click();
    await ItemPage.itemQuantity.setValue(9);
    await ItemPage.addToCartButton.click();
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    await MainCartPage.checkOutButton.scrollIntoView();
  });

  afterEach('remove items', async () => {
    await selectAndClickElementInDropdown(HeaderPage.cartButton, HeaderPage.cartView);
    const deleteItemButton = await MainCartPage.getRemoveItemButton(1);
    await deleteItemButton.click();
    await MainCartPage.open('/index.php?route=account/logout');
  });

  it('Verify that we have Step 2: Billing Details', async () => {
    await MainCartPage.checkOutButton.click();
    const expectedStep = await CheckoutPage.currentAccordionButton.getText();
    expect(expectedStep).toContain('Step 2: Billing Details');
  });

  it('Verify that we have step Step 3: Delivery Details', async () => {
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentAccordionButton.waitUntil(async () => {
      const isExist = await CheckoutPage.currentAccordionButton.getText() === 'Step 3: Delivery Details';
      return isExist;
    }, { timeout: 5000 });
    const expectedStep = await CheckoutPage.currentAccordionButton.getText();
    expect(expectedStep).toContain('Step 3: Delivery Details');
  });

  it('Verify that we have step Step 4: Delivery Method', async () => {
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentAccordionButton.waitUntil(async () => {
      const isExist = await CheckoutPage.currentAccordionButton.getText() === 'Step 4: Delivery Method';
      return isExist;
    }, { timeout: 5000 });
    const expectedStep = await CheckoutPage.currentAccordionButton.getText();
    expect(expectedStep).toContain('Step 4: Delivery Method');
  });

  it('Verify that we have checkbox "Cash On Delivery"', async () => {
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    const expectedElement = await CheckoutPage.cashOnDeliveryCheckbox;
    await expect(expectedElement).toExist();
  });

  it('Verify that we have checkbox "I have read and agree to the Terms & Conditions"', async () => {
    await MainCartPage.checkOutButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.waitForClickable();
    await CheckoutPage.currentContinueButton.click();
    await CheckoutPage.currentContinueButton.scrollIntoView();
    await CheckoutPage.currentContinueButton.waitForClickable();
    const expectedElement = await CheckoutPage.iHaveReadAndAgreeInput;
    await expect(expectedElement).toExist();
  });
});
