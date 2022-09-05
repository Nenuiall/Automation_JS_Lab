const logger = require('../helpers/logger');

class MainPage {
  async open(path) {
    logger.info(`open ${path} page`);
    await browser.url(path);
    await browser.waitUntil(
      async () => (await $('#logo img').getAttribute('title')) === 'Awesome Shop',
      {
        timeout: 10000,
        timeoutMsg: 'Awesome Shop is not responding',
      },
    );
  }
}

module.exports = MainPage;
