const { DataTypes } = require("sequelize");
const sequelize = require("./index.model");

const Admin = sequelize.define(
  "Admin",
  {
    login_id: {
      type: DataTypes.STRING(8),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(400),
      allowNull: true,
      unique: true,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Admin;
