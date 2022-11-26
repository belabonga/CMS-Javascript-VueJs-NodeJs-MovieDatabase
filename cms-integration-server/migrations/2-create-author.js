'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      role: {
        allowNull : false,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull : false,
        type: Sequelize.STRING
      },
      address: {
        allowNull : false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
  }
};