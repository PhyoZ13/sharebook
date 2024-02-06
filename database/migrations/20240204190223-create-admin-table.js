'use strict';
const { DataTypes } = require('sequelize');
const Admin = require('../../app/models/admin.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admins', {
      login_id: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      token: {
        type: Sequelize.STRING(400),
        allowNull: true,
        unique: true,
      },
      created_at: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admins');
  }
};
