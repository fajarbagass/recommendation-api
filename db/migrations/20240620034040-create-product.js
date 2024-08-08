"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand_id: {
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
      },
      os: {
        type: Sequelize.STRING,
      },
      chipset: {
        type: Sequelize.STRING,
      },
      display: {
        type: Sequelize.STRING,
      },
      camera: {
        type: Sequelize.STRING,
      },
      battery: {
        type: Sequelize.STRING,
      },
      network: {
        type: Sequelize.STRING,
      },
      charging: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
