const { expect } = require('chai');
const HeaderPage = require('../../../framework/components/header-page');
const ItemResultPage = require('../../../framework/components/item-result-page');

describe('Product display test', () => {
  before(async () => {
    await HeaderPage.open('/');
    await HeaderPage.desktops.click();
    await HeaderPage.showAllDesktops.click();
  });

  it('Grid', async () => {
    await ItemResultPage.displayListButton.waitForDisplayed({ timeout: 3000 });
    await expect(await ItemResultPage.isDisplayedCorrect('Grid')).to.be.true;
  });

  it('List', async () => {
    await ItemResultPage.displayGridButton.waitForDisplayed({ timeout: 3000 });
    await expect(await ItemResultPage.isDisplayedCorrect('List')).to.be.true;
  });
});
