const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.get("/", ProductController.findAll);
router.post("/create", ProductController.insertOrUpdate);

module.exports = router;
