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
      name: DataTypes.STRING(20),
      phone: DataTypes.INTEGER(20),
      firstLine: DataTypes.STRING(100),
      secondLine: DataTypes.STRING(100),
      thirdLine: DataTypes.STRING(100),
      isSignUp: DataTypes.BOOLEAN,
      isSubmit: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
