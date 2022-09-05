const { expect } = require('chai');
const { selectAndClickElementInDropdown } = require('../../../framework/helpers/utilities');
const HeaderPage = require('../../../framework/components/header-page');
const ItemResultPage = require('../../../framework/components/item-result-page');

describe('Product sort test', () => {
  let actual;
  let expected;
  beforeEach(async () => {
    await HeaderPage.open('/');
    await selectAndClickElementInDropdown(HeaderPage.desktops, HeaderPage.showAllDesktops);
  });

  it('Check Sort by Name (A - Z)', async () => {
    await ItemResultPage.displayListButton.click();
    await ItemResultPage.chooseSotrBy('Name (A - Z)');
    actual = (await ItemResultPage.getItemsNames()).join();
    expected = (await ItemResultPage.getItemsNames()).sort().join();
    await expect(actual).to.equal(expected);
  });

  it('Check Sort by Name (Z - A)', async () => {
    await ItemResultPage.displayListButton.click();
    await ItemResultPage.chooseSotrBy('Name (Z - A)');
    actual = (await ItemResultPage.getItemsNames()).join();
    expected = (await ItemResultPage.getItemsNames()).sort().reverse().join();
    await expect(actual).to.equal(expected);
  });

  it('Check Sort by Price (Low > High)', async () => {
    await ItemResultPage.displayListButton.click();
    await ItemResultPage.chooseSotrBy('Price (Low > High)');
    actual = (await ItemResultPage.getItemsPrices()).join();
    expected = (await ItemResultPage.getItemsPrices()).sort((a, b) => a - b).join();
    await expect(actual).to.equal(expected);
  });

  it('Check Sort by Price (High > Low)', async () => {
    await ItemResultPage.displayListButton.click();
    await ItemResultPage.chooseSotrBy('Price (High > Low)');
    actual = (await ItemResultPage.getItemsPrices()).join();
    expected = (await ItemResultPage.getItemsPrices()).sort((a, b) => b - a).join();
    await expect(actual).to.equal(expected);
  });
});
