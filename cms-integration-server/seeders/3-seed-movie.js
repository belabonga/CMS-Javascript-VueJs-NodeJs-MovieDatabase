'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const movies = require("../data/movie.json");

     movies.forEach(movie => {
      delete movie.id;
      movie.status = "Active";
      movie.createdAt = new Date ();
      movie.updatedAt = new Date();
     });
    
    await queryInterface.bulkInsert('Movies', movies, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
