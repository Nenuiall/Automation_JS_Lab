const getNeededElementFromTable = async (searchingElement, selectorAllRows, selectorColumnWithSearchingElements, selectorNeededField) => {
  const allRowFromTable = await $$(selectorAllRows);
  const allValuesFromRequiredColumn = await Promise.all(allRowFromTable.map((row) => row.$(selectorColumnWithSearchingElements).getText()));
  const neededRowIndexFromTable = allValuesFromRequiredColumn.indexOf(searchingElement);
  return allRowFromTable[neededRowIndexFromTable].$(selectorNeededField);
};

module.exports = getNeededElementFromTable;
