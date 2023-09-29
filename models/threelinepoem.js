'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThreeLinePoem extends Model {
    static associate(models) {
      ThreeLinePoem.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  ThreeLinePoem.init(
    {
      poemId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      firstLine: DataTypes.STRING,
      secondLine: DataTypes.STRING,
      thirdLine: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'ThreeLinePoem',
    }
  );
  return ThreeLinePoem;
};
