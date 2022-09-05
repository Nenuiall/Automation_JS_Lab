class RightColumnPage {
  getFromList(element) {
    return $(`//div[@class="list-group"]//a[contains(text(), "${element}")]`);
  }
}

module.exports = new RightColumnPage();
