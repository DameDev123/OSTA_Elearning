const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// =====================================================
// GET ALL CATEGORIES 
// =====================================================
router.get("/", categoryController.getAll);

module.exports = router;
