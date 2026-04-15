import express from "express";

import { userAuth } from "../middleware/auth.js";
import connectionRequest from "../models/connectionRequest.js";

const userRoutes = express.Router();

userRoutes.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const requestData = await connectionRequest.find({
      toUserId: loginUser._id,
      status: "requested",
    }).populate("fromUserId" , ["firstName" , "lastName"]);

    res.json({ message: "Data fetched sucessfully", data: requestData });
  } catch (error) {
    res.status(404).json({
      message: "error " + error.message,
    });
  }
});

export { userRoutes };
