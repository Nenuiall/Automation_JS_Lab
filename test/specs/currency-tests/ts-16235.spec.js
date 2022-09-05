const { expect } = require('chai');
const HeaderPage = require('../../../framework/components/header-page');
const ItemResultPage = require('../../../framework/components/item-result-page');
const CurrencyConverter = require('../../../framework/helpers/currency-converter');

describe('Checking the correctness of currency calculation', () => {
  let pricesUSD;
  let pricesRUB;
  let pricesBYN;
  let convertedPrices;

  before(async () => {
    await HeaderPage.open('/');
  });

  it('Save Product prices in USD', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownUSD.click();
    pricesUSD = await ItemResultPage.getItemsPrices();
  });

  it('Check Russian Ruble', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownRUB.click();
    pricesRUB = await ItemResultPage.getItemsPrices();
    convertedPrices = CurrencyConverter.currencyConverter(pricesRUB, 72.5088);
    await expect(convertedPrices.join(' ')).to.equal(pricesUSD.join(' '));
  });

  it('Check Belarusian Ruble', async () => {
    await HeaderPage.dropdownButton.click();
    await HeaderPage.dropdownBYN.click();
    pricesBYN = await ItemResultPage.getItemsPrices();
    convertedPrices = CurrencyConverter.currencyConverter(pricesBYN, 2.5112);
    await expect(convertedPrices.join(' ')).to.equal(pricesUSD.join(' '));
  });
});
