'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {

      // AUTHOR & MOVIE
      Author.hasMany(models.Movie, {
        foreignKey: 'authorId'
      });
      
      // AUTHOR & FAVOURTIE
      Author.hasMany(models.Favourite, {
        foreignKey: 'AuthorId'
      });

    }
  }
  Author.init({
    username: {
      type : DataTypes.STRING,
      unique: {
        msg: "Username has already been taken"
      },
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Username is Required"
        },
        notNull : {
          msg : "Username is Required"
        }
      }
    },

    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: {
        msg: "Email has already registered"
      },
      isEmail: {
        msg: "Please use right email format"
      },
      validate : {
        notEmpty : {
          msg : "Email is Required"
        },
        notNull : {
          msg : "Email is Required"
        }
      }
    },

    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Password is Required"
        },
        notNull : {
          msg : "Password is Required"
        },
        min:{
          args:[5],
          msg:"Minimum 5 characters required"
        }
      }
    },

    role: DataTypes.STRING,

    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        msg: "Phone Number has already registered"
      }
    },
    address: DataTypes.STRING,
    
  },
  {
    hooks : {
      beforeCreate (author) {
        const hashedPass = bcrypt.hashSync(author.password, bcrypt.genSaltSync(10)); // 10 is default
        author.password = hashedPass
      },
    },
    sequelize,
    modelName: 'Author',
  });

  return Author;
};