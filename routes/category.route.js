const express = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = express.Router();

router.get("/", CategoryController.findAll);
router.post("/create", CategoryController.insertOrUpdate);

module.exports = router;
