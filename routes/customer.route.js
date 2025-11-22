const express = require("express");
const CustomerController = require("../controllers/CustomerController");

const router = express.Router();

router.get("/", CustomerController.findAll);
router.post("/create", CustomerController.createOrUpdate);

module.exports = router;
