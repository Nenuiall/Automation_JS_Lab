const { expect } = require('chai');
const UserFactory = require('../../../framework/business-objects/user-factory');
const Login = require('../../../framework/business-objects/login');
const AccountPage = require('../../../framework/pageobjects/account-page');
const HeaderPage = require('../../../framework/components/header-page');
const ItemPage = require('../../../framework/components/item-page');
const MyWishListPage = require('../../../framework/pageobjects/my-wish-list-page');

describe('Checking the possibility of changing the Wish list', async () => {
  const { leia } = UserFactory.getValidUsers();
  const itemSamples = ['MacBook', 'Canon EOS 5D'];

  before(async () => {
    await MyWishListPage.open('/');
    await Login.loginAsRegisteredUser(leia.userName, leia.password2);
  });

  after(async () => {
    await Login.logout();
  });

  it('You can successfully add items to your wish list', async () => {
    await HeaderPage.logo.click();
    await ItemPage.getItem(itemSamples[0]).click();
    await ItemPage.addToWishListButton.click();
    const firstExpectedMessage = `Success: You have added ${itemSamples[0]} to your wish list!`;
    const firstSuccessMessage = await ItemPage.successMessage.getText();

    await HeaderPage.logo.click();
    await ItemPage.getItem(itemSamples[1]).click();
    await ItemPage.addToWishListButton.click();
    const secondExpectedMessage = `Success: You have added ${itemSamples[1]} to your wish list!`;
    const secondSuccessMessage = await ItemPage.successMessage.getText();

    expect(firstSuccessMessage).to.contain(firstExpectedMessage);
    expect(secondSuccessMessage).to.contain(secondExpectedMessage);
  });

  it('You can remove items from the wish list', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownMyAccount.click();
    await AccountPage.modificationOfWishListLink.click();
    await MyWishListPage.clickRemoveButton(1);

    const expectedMessage = 'Success: You have modified your wish list!';
    const successMessage = await MyWishListPage.successMessage.getText();
    expect(successMessage).to.contain(expectedMessage);
  });

  it('You can add items to Cart from the wish list', async () => {
    await MyWishListPage.closeSuccessMessageButton.click();
    await MyWishListPage.addToCardButton.click();

    const expectedMessage = `Success: You have added ${itemSamples[0]} to your shopping cart!`;
    const successMessage = await MyWishListPage.successMessage.getText();
    expect(successMessage).to.contain(expectedMessage);
  });
});
