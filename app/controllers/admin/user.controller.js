const sequelize = require("../../models/index.model");
const response = require("../../helpers/response");
const bcrypt = require("../../helpers/bcrypt");

const index = async (req, res, next) => {
  try {
    const [users] = await sequelize.query("SELECT * FROM Users");
    return response.success(res, "Successfully", users);
  } catch (error) {
    next(new Error("Failed to fetch users"));
  }
};

const create = async (req, res, next) => {
  const { user_name, email, password, bio, user_type, status } = req.body;

  try {
    const [existingUser] = await sequelize.query(
      `
      SELECT * FROM Users WHERE user_name = :user_name || email = :email
    `,
      {
        replacements: {
          user_name,
          email,
        },
      }
    );

    if (existingUser && existingUser.length > 0) {
      next(new Error("User already exit"));
      return;
    }

    await sequelize.query(
      `INSERT INTO Users (user_name, email, password, bio, token, user_type, status, updated_at, updated_by)
      VALUES (:user_name, :email, :password, :bio, NULL, :user_type, :status, NOW(), :updated_by)`,
      {
        replacements: {
          user_name,
          email,
          password,
          bio,
          user_type,
          status,
          updated_by: req.admin.login_id,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    return response.success(res, "User created successfully");
  } catch (error) {
    next(new Error("Failed to create user"));
  }
};

const show = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const [user] = await sequelize.query(
      "SELECT * FROM Users WHERE user_id = :user_id",
      {
        replacements: {
          user_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user) {
      next(new Error("User not found"));
      return;
    }

    delete user.token;
    delete user.password;

    return response.success(res, "Successfully", user);
  } catch (error) {
    next(new Error("Fail to fetch user"));
  }
};

const update = async (req, res, next) => {
  const { user_id } = req.params;
  const { user_name, email, password, bio, user_type, status } = req.body;

  try {
    let [user] = await sequelize.query(
      "SELECT * FROM Users WHERE user_id = :user_id",
      {
        replacements: {
          user_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user) {
      next(new Error("User not found"));
      return;
    }

    await sequelize.query(
      `UPDATE Users SET user_name = :user_name, email = :email, password = :password, bio = :bio, user_type = :user_type, status = :status WHERE user_id = :user_id `,
      {
        replacements: {
          user_name,
          email,
          password: bcrypt.encode(password),
          bio,
          user_type,
          status,
          user_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    [user] = await sequelize.query(
      "SELECT * FROM Categories WHERE user_id = :user_id",
      {
        replacements: {
          user_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return response.success(res,"Successfully",user);

  } catch (error) {
    next(new Error("Failed to update user"));
  }
};

const destroy = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const [user] = await sequelize.query(
      "SELECT * FROM Users WHERE user_id = :user_id",
      {
        replacements: {
          user_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user) {
      next(new Error("User not found"));
      return;
    }

    await sequelize.query(`DELETE FROM Users WHERE user_id = :user_id`, {
      replacements: {
        user_id: id,
      },
      type: sequelize.QueryTypes.DELETE,
    });

    return res.json({
      status: true,
      message: "Successfully",
    });
  } catch (error) {
    next(new Error("Failed to delete user" + error));
  }
};

const updateStatus = async (req, res, next) => {
  const { user_id } = req.params;
  const { status } = req.body;

  try {
    let [user] = await sequelize.query(
      "SELECT * FROM Users WHERE user_id = :user_id",
      {
        replacements: {
          user_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user) {
      next(new Error("User not found"));
      return;
    }

    await sequelize.query(
      `UPDATE Users SET status = :status WHERE user_id = :user_id `,
      {
        replacements: {
          status,
          user_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    [user] = await sequelize.query(
      "SELECT * FROM Users WHERE user_id = :user_id",
      {
        replacements: {
          user_id,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    delete user.token;
    delete user.password;

    return response.success(res, "Successfully", user);
  } catch (error) {
    next(new Error("Failed to update status"));
  }
};

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  updateStatus,
};
