'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     const genres = require("../data/genre.json");

     genres.forEach(genre => {
      delete genre.id;
      genre.createdAt = new Date ();
      genre.updatedAt = new Date();
     });
    
     await queryInterface.bulkInsert('Genres', genres, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Genres', null, {});
  }
};
