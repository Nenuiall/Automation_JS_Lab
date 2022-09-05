const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const ItemPage = require('../../../framework/components/item-page');

describe('Write review test', () => {
  const warning = 'Warning: Review Text must be between 25 and 1000 characters!';
  const success = 'Thank you for your review. It has been submitted to the webmaster for approval.';
  const reviewerName = 'Jhon';
  let reviewText;

  beforeEach(() => {
    ItemPage.open('/');
  });

  it('Review with text less than 25 characters', async () => {
    reviewText = faker.random.alpha(1);
    const reviewResult = await ItemPage.writeReview(reviewerName, reviewText);
    await expect(reviewResult).to.equal(warning);
  });

  it('Review with text more than 1000 characters', async () => {
    reviewText = faker.random.alpha(1001);
    const reviewResult = await ItemPage.writeReview(reviewerName, reviewText);
    await expect(reviewResult).to.equal(warning);
  });

  it('Review with appropriate text', async () => {
    reviewText = faker.random.alpha(30);
    const reviewResult = await ItemPage.writeReview(reviewerName, reviewText);
    await expect(reviewResult).to.equal(success);
  });
});
