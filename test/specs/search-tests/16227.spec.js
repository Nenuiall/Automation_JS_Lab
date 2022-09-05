const { expect } = require('chai');

const Header = require('../../../framework/components/header-page');
const ItemResultPage = require('../../../framework/components/item-result-page');

describe('Product search check', () => {
  before(() => {
    Header.open('/');
  });

  it('Case-sensitive search', async () => {
    await Header.useSearch('iPod classic');
    const searchResultItems = await ItemResultPage.getItemsNames();
    await expect(searchResultItems).to.include('iPod Classic');
  });

  it('Full string in upper-case', async () => {
    await Header.useSearch('IPOD CLASSIC');
    const searchResultItems = await ItemResultPage.getItemsNames();
    await expect(searchResultItems).to.include('iPod Classic');
  });

  it('Incomplete entry of string to get multiple products', async () => {
    await Header.useSearch('iPod');
    const searchResultItems = await ItemResultPage.getItemsNames();
    await searchResultItems.forEach((element) => {
      expect(element).to.include('iPod');
    });
  });

  it('Search for a non-existent product', async () => {
    await Header.useSearch('Hello');
    const searchResultItems = await ItemResultPage.getItemsNames();
    await expect(searchResultItems).to.be.empty;
  });
});
