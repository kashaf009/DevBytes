import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";
import cookieParser from "cookie-parser";
import { userAuth } from "./middleware/auth.js";
import { authRoutes } from "./routes/auth.js";
import { profileRoutes } from "./routes/profile.js";
import { requestRoutes } from "./routes/request.js";
import { userRoutes } from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import initilizeSocket from "./utils/socket.js";
import chatRoute from "./routes/chat.js";

dotenv.config();

const App = express();

App.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// parsers
App.use(express.json());
App.use(cookieParser());

// routes
App.use("/", authRoutes);
App.use("/", profileRoutes);
App.use("/", requestRoutes);
App.use("/", userRoutes);
App.use("/", chatRoute);

const server = http.createServer(App);
initilizeSocket(server);


connectDB()
  .then(() => {
    console.log("successfully connected to database");
    server.listen(7777, () => {
      console.log("successfully listened to port no. 7777");
    });
  })
  .catch((err) => {
    console.error(err);
  });
