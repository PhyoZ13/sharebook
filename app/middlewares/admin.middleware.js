const jwt = require("../helpers/jwt");
const Admin = require("../models/admin.model");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next(new Error("Unathourized"));
      return;
    }
    let token = req.headers.authorization.split(" ")[1];
    let admin = jwt.decode(token);
    if (!admin) {
      next(new Error("Unathourized"));
      return;
    }

    const existingLoginId = await Admin.findOne({ login_id : admin.login_id });
    if (!existingLoginId) {
      next(new Error("Unathourized"));
    }

    req.admin = admin;
    next();

  } catch (error) {
    next(new Error("Unathourized"))
  }
};

module.exports = adminMiddleware;
