const { getIO } = require("../sockets/socket");
const Booking = require("../models/Booking");
const Show = require("../models/Show");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { show, seats } = req.body;

    const showData = await Show.findById(show);

    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    if (showData.availableSeats < seats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // Reduce available seats
    showData.availableSeats -= seats;

    await showData.save();

    // Create Booking
    const booking = await Booking.create({
      user: req.user._id,
      show,
      seats,
      totalPrice: seats * showData.price,
    });

    // Emit real-time seat update
    const io = getIO();

    if (io) {
      io.to(show.toString()).emit("seatUpdated", {
        showId: show,
        availableSeats: showData.availableSeats,
      });
    }

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate({
      path: "show",
      populate: ["movie", "theater"],
    });

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // User can cancel only their own booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Restore seats
    const show = await Show.findById(booking.show);

    if (show) {
      show.availableSeats += booking.seats;
      await show.save();

      // Emit real-time seat update
      const io = getIO();

      if (io) {
        io.to(show._id.toString()).emit("seatUpdated", {
          showId: show._id,
          availableSeats: show.availableSeats,
        });
      }
    }

    // Delete booking
    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};