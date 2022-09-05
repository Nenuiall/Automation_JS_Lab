module.exports = {
  currencyConverter: (arrPrices, currencyRate) => {
    // currencyRate must be a ratio to another currency. exmpl: $1 = ₽72.5088
    // so to convert array of ₽-prices to $-prices currencyRate will be 72.5088
    convertedPrices = [];
    for (let i = 0; arrPrices.length > i; i += 1) {
      const convert = Math.round((arrPrices[i] / currencyRate) * 100) / 100;
      convertedPrices.push(convert);
    }
    return convertedPrices;
  },
};
