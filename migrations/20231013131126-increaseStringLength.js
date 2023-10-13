'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'firstLine', {
      type: Sequelize.STRING(500),
    });
    await queryInterface.changeColumn('Users', 'secondLine', {
      type: Sequelize.STRING(500),
    });
    await queryInterface.changeColumn('Users', 'thirdLine', {
      type: Sequelize.STRING(500),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'firstLine', {
      type: Sequelize.STRING(50),
    });
    await queryInterface.changeColumn('Users', 'secondLine', {
      type: Sequelize.STRING(50),
    });
    await queryInterface.changeColumn('Users', 'thirdLine', {
      type: Sequelize.STRING(50),
    });
  },
};
