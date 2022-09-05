const { faker } = require('@faker-js/faker');

class ReviewFactory {
  static getReview() {
    return {
      review: faker.lorem.paragraph(),
    };
  }
}

module.exports = ReviewFactory;
