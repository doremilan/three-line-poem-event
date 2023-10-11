'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(15),
      },
      phone: {
        type: Sequelize.INTEGER(15),
      },
      firstLine: {
        type: Sequelize.STRING(50),
      },
      secondLine: {
        type: Sequelize.STRING(50),
      },
      thirdLine: {
        type: Sequelize.STRING(50),
      },
      isSignUp: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      isSubmit: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
