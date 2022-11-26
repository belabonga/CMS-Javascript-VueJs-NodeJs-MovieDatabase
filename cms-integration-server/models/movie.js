'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.Genre, { foreignKey : "genreId"});
      Movie.belongsTo(models.Author, { foreignKey : "authorId"});
      Movie.hasMany(models.Favourite, { foreignKey : "MovieId"});
    }
  }
  Movie.init({
    id : {
      type : DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Title is Required"
        },
        notNull : {
          msg : "Title is Required"
        }
      }
    },

    synopsis: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Synopsis is Required"
        },
        notNull : {
          msg : "Synopsis is Required"
        }
      }
    },

    trailerUrl: DataTypes.STRING,

    imgUrl: DataTypes.STRING,

    rating: {
      type : DataTypes.INTEGER,
      validate : {
        min: 1,
        max : 5,
      }
    },

    status: DataTypes.STRING,

    updatedAt : DataTypes.DATE,

    createdAt : DataTypes.DATE,

    genreId : {
      type : DataTypes.INTEGER,
      references : {
        model : 'Genres',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
    
    authorId : {
      type : DataTypes.INTEGER,
      references : {
        model : 'Authors',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });

  Movie.beforeCreate((value) => {
    value.status = `Active`
  })
  return Movie;
};