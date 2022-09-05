const { faker } = require('@faker-js/faker');

class AddressFactory {
  static getAddress() {
    return {
      street: faker.address.street(),
      city: faker.address.city(),
      postCode: faker.address.zipCode(),
    };
  }

  static getShippingEstimateAddress() {
    return {
      albania: {
        country: 2,
        region: 43,
      },
      belarus: {
        country: 20,
        region: 337,
      },
    };
  }
}

module.exports = AddressFactory;
