const faker = require('faker');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = [];
    for (let i = 0; i < 100; i++) {
      Users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
      });
    }
    try {
      return await queryInterface.bulkInsert('Users', Users, {});
    } catch (e) {
      console.error(e);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
