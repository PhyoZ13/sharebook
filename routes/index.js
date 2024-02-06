const router = require("express").Router();
const adminRoutes = require("./admin/index.routes");

router.use("/admin",adminRoutes);

module.exports = router;