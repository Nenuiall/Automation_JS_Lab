const { faker } = require('@faker-js/faker');

class UserFactory {
  static getValidUsers() {
    return {
      darth: {
        firstName: 'Darth',
        lastName: 'Vader',
        userName: 'hot@gmail.com',
        telephone: '123456789',
        password: '123456',
      },
      luke: {
        firstName: 'Luke',
        lastName: 'Skywalker',
        userName: 'tatuin@gmail.com',
        telephone: '123456789',
        password: '123456',
      },
      leia: {
        firstName: 'Leia',
        lastName: 'Organa',
        userName: 'tukiddajaddo-4308@yopmail.com',
        telephone: '123456789',
        password1: '123456',
        password2: '789123',
        company: 'StarWars Ltd',
        webSite: 'https://starwarsforever.com',
      },
      peter: {
        firstName: 'Peter',
        lastName: 'Vampire',
        userName: 'test@gmail.com',
        telephone: '123456789',
        password: '123456',
        payPalUserName: 'sb-t7dxa3301166@personal.example.com',
        payPalPassword: 'i%J0As7!',
      },
    };
  }

  static getRandomInvalidUser() {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.email(),
      telephone: faker.phone.number(),
      password: faker.internet.password(),
    };
  }
}

module.exports = UserFactory;
