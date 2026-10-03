const express = require("express");

const router = express.Router();

const {
  addShow,
  getShows,
  getShowById,
  updateShow,
  deleteShow,
} = require("../controllers/showController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/", getShows);
router.get("/:id", getShowById);

// Admin
router.post("/", protect, isAdmin, addShow);
router.put("/:id", protect, isAdmin, updateShow);
router.delete("/:id", protect, isAdmin, deleteShow);

module.exports = router;