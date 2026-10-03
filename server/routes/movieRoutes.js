const express = require("express");

const router = express.Router();

const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const {
  protect,
  isAdmin,
} = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getMovies);
router.get("/:id", getMovieById);

// Admin Routes
router.post("/", protect, isAdmin, addMovie);
router.put("/:id", protect, isAdmin, updateMovie);
router.delete("/:id", protect, isAdmin, deleteMovie);

module.exports = router;