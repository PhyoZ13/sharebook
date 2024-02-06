const router = require("express").Router();
const userController = require("../../app/controllers/admin/user.controller");
const validateBody = require("../../app/validators/body.validator");
const validateParams = require("../../app/validators/body.validator");
const userSchema = require("../../app/schemas/user.schema");
const allSchema = require("../../app/schemas/all.schema");
const adminMiddleware = require("../../app/middlewares/admin.middleware");

router.get("/", [adminMiddleware, userController.index]);

router.post("/", [
  adminMiddleware,
  validateBody(userSchema.create),
  userController.create,
]);

router.put("/:user_id/status", [
  adminMiddleware,
  validateBody(userSchema.updateStatus),
  userController.updateStatus,
]);

router
  .route("/:user_id")
  .get([
    adminMiddleware,
    validateParams(allSchema.name, "user_id"),
    userController.show,
  ])
  .put([
    adminMiddleware,
    validateParams(allSchema.name, "user_id"),
    userController.update,
  ])
  .delete([
    adminMiddleware,
    validateParams(allSchema.name, "user_id"),
    userController.destroy,
  ]);

module.exports = router;
