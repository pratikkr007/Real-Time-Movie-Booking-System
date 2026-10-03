const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    // Optional
    language: {
      type: String,
      enum: [
        "English",
        "Hindi",
        "Tamil",
        "Telugu",
        "Kannada",
        "Malayalam"
      ],
      default: "English",
    },

    price: {
      type: Number,
      required: true,
    },

    poster: {
      type: String,
      default: "",
    },

    availableSeats: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);