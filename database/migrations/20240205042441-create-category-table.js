"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      category_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("UUID()"),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.BIGINT,
      },
      updated_by: {
        type: Sequelize.STRING(45),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories");
  },
};
