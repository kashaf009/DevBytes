import express from "express";
import user from "../models/userModel";
import { userAuth } from "../middleware/auth";
import connectionRequestModel from "../models/connectionRequest";

const requestRoutes = express.Router;

requestRoutes.post(
  "/send/request/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();

      res.send("connection request sent successfully");
    } catch (error) {
      res.status(404).send("error:" + error.message);
    }
  },
);
