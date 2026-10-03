let io;

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Join show room
    socket.on("joinShow", (showId) => {
      socket.join(showId);
      console.log(`Socket ${socket.id} joined ${showId}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => io;

module.exports = {
  initializeSocket,
  getIO,
};