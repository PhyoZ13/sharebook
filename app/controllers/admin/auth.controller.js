const Admin = require("../../models/admin.model");
const sequelize = require("../../models/index.model");
const response = require("../../helpers/response");
const bcrypt = require("../../helpers/bcrypt");
const jwt = require("../../helpers/jwt");

const login = async (req, res, next) => {
  const { login_id, password } = req.body;

  try {
    const [admin] = await sequelize.query(
      "SELECT * FROM Admins WHERE login_id = :login_id",
      {
        replacements: { login_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!admin) {
      return response.error(res, "Invalid Credential");
    }

    const isPasswordValid = bcrypt.decode(password, admin.password);

    if (!isPasswordValid) {
      return response.error(res, "Invalid Credentail");
    }
    
    await sequelize.query(
      "UPDATE Admins SET token = NULL WHERE login_id = :login_id",
      {
        replacements: {
          login_id: admin.login_id,
        },
      }
    );

    admin.token = jwt.encode(admin);

    await sequelize.query(
      "UPDATE Admins SET token = :token WHERE login_id = :login_id",
      {
        replacements: {
          login_id: admin.login_id,
          token: admin.token,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    delete admin.password;

    return response.success(res, "Login Successfully", admin);
  } catch (error) {
    return response.error(res, "Invalid credential : " + error);
  }
};

const logout = async (req, res, next) => {
  const { login_id } = req.admin;

  try {
    const [admin] = await sequelize.query(
      "SELECT * FROM Admins WHERE login_id = :login_id",
      {
        replacements: { login_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!admin) {
      next(new Error("Invalid Token"));
      return;
    }

    await sequelize.query(
      "UPDATE Admins SET token = NULL WHERE login_id = :login_id",
      {
        replacements: {
          login_id: admin.login_id,
        },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    return res.json({
      status: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

const register = async (req, res, next) => {
  const { name, login_id, password } = req.body;

  try {
    const existingLoginId = await Admin.findOne({
      where: { login_id },
    });

    if (existingLoginId) {
      return response.error(res, "Already Registered");
    }

    const existingName = await Admin.findOne({
      where: { name },
    });

    if (existingName) {
      return response.error(res, "Already Registered");
    }

    const token = jwt.encode(req.body);

    await sequelize.query(
      "INSERT INTO Admins (name, login_id, password, token, created_at) VALUES (:name, :login_id, :password, :token, NOW())",
      {
        replacements: {
          name,
          login_id,
          password: bcrypt.encode(password),
          token,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const [admin] = await sequelize.query(
      "SELECT * FROM Admins WHERE login_id = :login_id",
      {
        replacements: {
          login_id,
        },
      }
    );

    delete admin.password;

    return response.success(res, "Register Successfully", admin);
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  login,
  register,
  logout,
};
