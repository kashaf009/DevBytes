import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";
import cookieParser from "cookie-parser";
import { userAuth } from "./middleware/auth.js";
import { authRoutes } from "./routes/auth.js";
import { profileRoutes } from "./routes/profile.js";

const App = express();


// parsers
App.use(express.json());
App.use(cookieParser());

App.use("/", authRoutes);
App.use("/", profileRoutes);

// sendconnectionrequest



connectDB()
  .then(() => {
    console.log("successfully connected to database");
    App.listen(7777, () => {
      console.log("successfully listened to port no. 7777");
    });
  })
  .catch((err) => {
    console.error(err);
  });
