const logger = require('../helpers/logger');

class InboxPage {
  get countOfMails() {
    return $('//div[@id="nbmail"]');
  }

  async openInbox(email) {
    logger.info(`open inbox page of ${email}`);
    await browser.url(`https://YOPmail.com?${email}`);
  }
}

module.exports = new InboxPage();
