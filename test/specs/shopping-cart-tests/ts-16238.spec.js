const LoginPage = require('../../../framework/pageobjects/login-page');
const UserFactory = require('../../../framework/business-objects/user-factory');
const MainCartPage = require('../../../framework/pageobjects/main-cart-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');

describe('Checking section main Cart', async () => {
  it('Input value has changed', async () => {
    const { peter } = UserFactory.getValidUsers();
    await MainCartPage.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await HeaderPage.components.click();
    await HeaderPage.getButtonFromDropdownMenu('Monitors').click();
    await ItemPage.getItem('Samsung SyncMaster 941BW').click();
    await ItemPage.itemQuantity.setValue(10);
    await ItemPage.addToCartButton.click();
    await HeaderPage.phonesPdas.click();
    await ItemPage.getItem('Palm Treo Pro').click();
    await ItemPage.itemQuantity.setValue(5);
    await ItemPage.addToCartButton.click();
    await HeaderPage.cartButton.click();
    await HeaderPage.cartView.click();
    const quantityPalmTreoPro = await MainCartPage.getQuantityInput(1);
    await quantityPalmTreoPro.setValue(10);
    const buttonUpdateQuantityPalmTreoPro = await MainCartPage.getQuantityUpdateButton(1);
    await buttonUpdateQuantityPalmTreoPro.click();
    const expectedQuantityPalmTreoPro = await quantityPalmTreoPro.getValue();
    expect(expectedQuantityPalmTreoPro).toEqual('10');
  });

  it('Message: "Success: You have modified your shopping cart!" was appeared', async () => {
    const quantityPalmTreoPro = await MainCartPage.getQuantityInput(1);
    await quantityPalmTreoPro.setValue(1);
    const quantitySamsungSyncMaster941BW = await MainCartPage.getQuantityInput(2);
    await quantitySamsungSyncMaster941BW.setValue(12);
    const buttonUpdateQuantitySamsungSyncMaster941BW = await MainCartPage.getQuantityUpdateButton(2);
    await buttonUpdateQuantitySamsungSyncMaster941BW.click();
    const textFromAlertMessage = await MainCartPage.successAlertMessage.getText();
    expect(textFromAlertMessage).toContain('Success: You have modified your shopping cart!');
  });

  it('Your shopping cart is empty!" - was appeared', async () => {
    const buttonDeleteSamsungSyncMaster941BW = await MainCartPage.getRemoveItemButton(2);
    await buttonDeleteSamsungSyncMaster941BW.click();
    const buttonDeletePalmTreoPro = await MainCartPage.getRemoveItemButton(1);
    await buttonDeletePalmTreoPro.click();
    await MainCartPage.shoppingCartContent.waitUntil(async () => {
      const textFromContent = await MainCartPage.shoppingCartContent.getText();
      return textFromContent === 'Your shopping cart is empty!';
    }, { timeout: 2000 });
    const textFromContent = await MainCartPage.shoppingCartContent.getText();
    expect(textFromContent).toContain('Your shopping cart is empty!');
  });
});
