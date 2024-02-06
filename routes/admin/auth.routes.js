const router = require("express").Router();
const authController = require("../../app/controllers/admin/auth.controller");
const validateBody = require("../../app/validators/body.validator");
const authSchema = require("../../app/schemas/auth.schema");
const adminMiddleware = require("../../app/middlewares/admin.middleware");

router.post("/login", [validateBody(authSchema.login), authController.login]);
router.post("/logout", [adminMiddleware, authController.logout]);
router.post("/register", [
  validateBody(authSchema.register),
  authController.register,
]);

module.exports = router;
