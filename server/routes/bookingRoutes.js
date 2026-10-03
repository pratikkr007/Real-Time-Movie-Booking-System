const express = require("express");

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

// Book Ticket
router.post("/", protect, createBooking);

// My Bookings
router.get("/my", protect, getMyBookings);

// Cancel Booking
router.delete("/:id", protect, cancelBooking);

module.exports = router;