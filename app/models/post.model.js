// models/post.js

const { DataTypes } = require("sequelize");
const sequelize = require("./user.model");

const Post = sequelize.define(
  "Post",
  {
    post_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(600),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "reported"),
      allowNull: false,
    },
    reported_user_ids: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
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

module.exports = Post;
