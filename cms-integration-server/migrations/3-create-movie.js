'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      trailerUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      authorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model : "Authors",
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model : "Genres",
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};