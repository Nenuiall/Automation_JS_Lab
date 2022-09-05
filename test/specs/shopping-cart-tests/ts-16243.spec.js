const DropDownCart = require('../../../framework/pageobjects/dropdown-cart-page');
const LoginPage = require('../../../framework/pageobjects/login-page');
const UserFactory = require('../../../framework/business-objects/user-factory');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const { selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');

describe('Checking the dropdown shopping cart', async () => {
  it('Item has been removed in the dropdown cart menu', async () => {
    const { peter } = UserFactory.getValidUsers();
    await DropDownCart.open('/index.php?route=account/login');
    await LoginPage.email.setValue(peter.userName);
    await LoginPage.password.setValue(peter.password);
    await LoginPage.loginButton.click();
    await HeaderPage.logo.click();
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.showAllMp3Players);
    await ItemPage.getItem('iPod Classic').click();
    await ItemPage.itemQuantity.setValue(1);
    await ItemPage.addToCartButton.click();
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.showAllMp3Players);
    await ItemPage.getItem('iPod Nano').click();
    await ItemPage.itemQuantity.setValue(2);
    await ItemPage.addToCartButton.click();
    await selectAndClickElementInDropdown(HeaderPage.mp3Players, HeaderPage.showAllMp3Players);
    await ItemPage.getItem('iPod Touch').click();
    await ItemPage.itemQuantity.setValue(1);
    await selectAndClickElementInDropdown(ItemPage.addToCartButton, HeaderPage.cartButton);
    const buttonDeleteIpodClassic = await DropDownCart.getDeleteButton('IPOD CLASSIC');
    await selectAndClickElementInDropdown(HeaderPage.cartButton, buttonDeleteIpodClassic);
    await browser.pause(1000);
    const expectedItemsInCart = await DropDownCart.numberOfGoodsInCart;
    await expect(expectedItemsInCart).toEqual(2);
  });

  it('Dropdown cart menu is disappeared after delete item', async () => {
    const buttonDeleteIpodNano = await DropDownCart.getDeleteButton('IPOD NANO');
    await selectAndClickElementInDropdown(HeaderPage.cartButton, buttonDeleteIpodNano);
    await browser.pause(1000);
    const cartButton = await HeaderPage.cartButton;
    await expect(cartButton).not.toHaveElementClassContaining('open');
  });

  it('Dropdown shopping cart is empty', async () => {
    const buttonDeleteIpodTouch = await DropDownCart.getDeleteButton('IPOD TOUCH');
    await selectAndClickElementInDropdown(HeaderPage.cartButton, buttonDeleteIpodTouch);
    await HeaderPage.cartButton.click();
    const dropDonCartIsEmpty = await DropDownCart.isEmpty();
    expect(dropDonCartIsEmpty).toBe(true);
  });
});
