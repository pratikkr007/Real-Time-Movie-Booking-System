const express = require("express");

const router = express.Router();

const {
  addTheater,
  getTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater,
} = require("../controllers/theaterController");

const {
  protect,
  isAdmin,
} = require("../middleware/authMiddleware");

// Admin Routes
router.post("/", protect, isAdmin, addTheater);
router.put("/:id", protect, isAdmin, updateTheater);
router.delete("/:id", protect, isAdmin, deleteTheater);

// Public Routes
router.get("/", getTheaters);
router.get("/:id", getTheaterById);

module.exports = router;