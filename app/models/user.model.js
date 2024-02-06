// models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('./index.model');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  bio: {
    type: DataTypes.STRING(400)
  },
  token: {
    type: DataTypes.STRING(400),
    allowNull: true,
    unique: true,
  },
  user_type: {
    type: DataTypes.ENUM('normal', 'premium'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('no_verify', 'verified', 'suspended'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.BIGINT,
  },
  updated_by: {
    type: DataTypes.STRING(45),
  },
}, {
  timestamps: false,
});

module.exports = User;
