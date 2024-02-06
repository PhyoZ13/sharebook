const router = require("express").Router();
const categoryController = require("../../app/controllers/admin/category.controller");
const validateBody = require("../../app/validators/body.validator");
const validateParams = require("../../app/validators/body.validator");
const categorySchema = require("../../app/schemas/category.schema");
const allSchema = require("../../app/schemas/all.schema");
const adminMiddleware = require("../../app/middlewares/admin.middleware");

router.get("/", [adminMiddleware, categoryController.index]);

router.post("/", [
  adminMiddleware,
  validateBody(categorySchema.create),
  categoryController.create,
]);

router
  .route("/:category_id")
  .get([
    adminMiddleware,
    validateParams(allSchema.name, "category_id"),
    categoryController.show,
  ])
  .put([
    adminMiddleware,
    validateParams(allSchema.name, "category_id"),
    categoryController.update,
  ])
  .delete([
    adminMiddleware,
    validateParams(allSchema.name, "category_id"),
    categoryController.destroy,
  ]);

module.exports = router;
