const getNumberFromString = (value) => Math.abs(parseInt(value.slice(1).split(',').join(''), 10));

const selectAndClickElementInDropdown = async (openDropDown, neededItem) => {
  await openDropDown.waitForClickable();
  await openDropDown.click();
  await neededItem.waitForClickable();
  await neededItem.click();
};

module.exports = { getNumberFromString, selectAndClickElementInDropdown };
