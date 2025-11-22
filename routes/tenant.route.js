const express = require("express");
const TenantController = require("../controllers/TenantController");

const router = express.Router();

router.post("/create", TenantController.create);

module.exports = router;
