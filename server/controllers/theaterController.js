const Theater = require("../models/Theater");

// Add Theater
const addTheater = async (req, res) => {
  try {
    const theater = await Theater.create(req.body);

    res.status(201).json({
      success: true,
      message: "Theater Added Successfully",
      theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Theaters
const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();

    res.json({
      success: true,
      count: theaters.length,
      theaters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Theater By ID
const getTheaterById = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    res.json({
      success: true,
      theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Theater
const updateTheater = async (req, res) => {
  try {
    const theater = await Theater.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    res.json({
      success: true,
      message: "Theater Updated Successfully",
      theater,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Theater
const deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);

    if (!theater) {
      return res.status(404).json({
        success: false,
        message: "Theater not found",
      });
    }

    await theater.deleteOne();

    res.json({
      success: true,
      message: "Theater Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTheater,
  getTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater,
};