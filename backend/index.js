// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');



// const authRoute = require("./routes/auth.route");
// const lawyerRoute=require("./routes/lawyer.route");
// const casesRoute=require("./routes/cases.route");
// const peersRoute=require("./routes/peers.route");
// const messageRoute=require("./routes/message.route");



// dotenv.config();

// const app = express();

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));




// app.use("/api/auth", authRoute);
// app.use("/api/lawyerdetails",lawyerRoute);
// app.use("/api/cases",casesRoute);
// app.use("/api/peers",peersRoute);
// app.use("/api/messages",messageRoute);



// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.get("/",(req,res)=>{
//     res.json("Server working fine")
// })



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http"); // Import http for socket.io
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// 🔥 Enable CORS for API requests
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true, // Allow cookies & auth headers
  })
);

app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const authRoute = require("./routes/auth.route");
const lawyerRoute = require("./routes/lawyer.route");
const casesRoute = require("./routes/cases.route");
const peersRoute = require("./routes/peers.route");
const messageRoute = require("./routes/message.route");

// Use Routes
app.use("/api/auth", authRoute);
app.use("/api/lawyerdetails", lawyerRoute);
app.use("/api/cases", casesRoute);
app.use("/api/peers", peersRoute);
app.use("/api/messages", messageRoute);

// 🔥 Set up Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.json("Server working fine");
});
