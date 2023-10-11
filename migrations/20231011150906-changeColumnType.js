'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'phone', {
      type: Sequelize.STRING(15),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'phone', {
      type: Sequelize.INTEGER(15),
    });
  },
};
