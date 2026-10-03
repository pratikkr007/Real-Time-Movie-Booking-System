require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const movieRoutes = require("./routes/movieRoutes");

const theaterRoutes = require("./routes/theaterRoutes");

const showRoutes = require("./routes/showRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const { initializeSocket } = require("./sockets/socket");

const app = express();

const server = http.createServer(app);


initializeSocket(server);

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/theaters", theaterRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/bookings", bookingRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "BookFast Backend Running 🚀"
    });
});

const PORT = process.env.PORT ;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});