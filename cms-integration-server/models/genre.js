'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Movie, {
        foreignKey: 'genreId'
      })
    }
  }
  Genre.init({
    id : {
      type : DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    updatedAt : DataTypes.DATE,
    createdAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};