'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate(models) {
      Favourite.belongsTo(models.Author, {
        foreignKey : "AuthorId"
      })
      Favourite.belongsTo(models.Movie, {
        foreignKey : "MovieId"
      })

    }
  }
  Favourite.init({
    AuthorId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Authors',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
    MovieId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Movies',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};