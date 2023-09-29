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
      email: DataTypes.STRING(100),
      snsId: DataTypes.STRING(50),
      name: DataTypes.STRING(50),
      adress: DataTypes.STRING(100),
      phone: DataTypes.INTEGER(30),
      isLogin: DataTypes.BOOLEAN,
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
