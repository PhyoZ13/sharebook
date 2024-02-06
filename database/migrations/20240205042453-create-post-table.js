"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      post_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("UUID()"),
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(600),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("draft", "published", "reported"),
        allowNull: false,
      },
      reported_user_ids: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      category_id: {
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
    await queryInterface.dropTable("Posts");
  },
};
