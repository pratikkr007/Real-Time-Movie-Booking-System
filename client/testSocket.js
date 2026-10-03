const { io } = require("socket.io-client");

const socket = io("http://localhost:8000");

socket.on("connect", () => {
    console.log("Connected:", socket.id);

    // Replace with your actual Show ID
    socket.emit("joinShow", "6a7ae0607172742e48a01b53");
});

socket.on("seatUpdated", (data) => {
    console.log("Seat Updated:", data);
});