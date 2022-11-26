'use strict';

const { hashSync } = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    const authors = require("../data/author.json");

     authors.forEach(author => {
      delete author.id;
      author.password = hashSync(author.password, 10);
      author.createdAt = new Date ();
      author.updatedAt = new Date();
     });
    
    await queryInterface.bulkInsert('Authors', authors, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
