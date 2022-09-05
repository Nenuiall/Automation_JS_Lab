class BreadCrumbPage {
  get breadcrumb() {
    return $('//ul[@class="breadcrumb"]');
  }

  async getChainElementsNames() {
    await this.breadcrumb.waitForDisplayed({ timeout: 3000 });
    const elements = $$('//ul[@class="breadcrumb"]//a');
    const result = [];
    await elements.forEach(async (element) => {
      result.push(await element.getText());
    });
    return result;
  }

  async isLinkCorrect(link) {
    const ChainElementsNames = await this.getChainElementsNames();
    const lastElement = ChainElementsNames[ChainElementsNames.length - 1];
    return link.includes(lastElement);
  }
}

module.exports = new BreadCrumbPage();
