const { DataTypes } = require("sequelize");
const sequelize = require("./index.model");

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.BIGINT,
    },
    updated_by: {
      type: DataTypes.STRING(45),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Category;
