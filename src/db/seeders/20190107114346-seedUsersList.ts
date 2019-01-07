'use strict';

import User from "../models/user";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let i = 0 ; i < 100 ; i++) {
      let user = new  User({firstName: 'anas', lastName:'md', email: 'anas@gmail.com'});
      await user.save();
    };

    let count: number = await User.count({where: {email: 'anas@gmail.com'}});
    console.log("All users = "+count);
  },

  down: async (queryInterface, Sequelize) => {
    await User.destroy({where: {}});
  }
};
