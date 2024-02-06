'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('UUID()'),
        allowNull: false,
        unique: true,
      },
      user_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING(400),
      },
      token: {
        type: Sequelize.STRING(400),
        allowNull: true,
        unique: true,
      },
      user_type: {
        type: Sequelize.ENUM('normal', 'premium'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('no_verify', 'verified', 'suspended'),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.BIGINT,
      },
      updated_by: {
        type: Sequelize.STRING(45),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
