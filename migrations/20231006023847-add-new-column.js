'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('ThreeLinePoems', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ThreeLinePoems', 'updatedAt');
  },
};
