'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING(15),
      phone: DataTypes.STRING(15),
      firstLine: DataTypes.STRING(500),
      secondLine: DataTypes.STRING(500),
      thirdLine: DataTypes.STRING(500),
      isSignUp: DataTypes.BOOLEAN,
      isSubmit: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      uuid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
