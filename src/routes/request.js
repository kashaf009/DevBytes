import express from "express";
import { userAuth } from "../middleware/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";
import userModel from "../models/userModel.js";

const requestRoutes = express.Router();

requestRoutes.post(
  "/send/request/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "requested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status ");
      }
      const connections = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const existingUser = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (!existingUser) {
        await connections.save();
      } else {
        res.json({message :"Connection Request Already Exists"});
      }

      res.json({
        message: "connection request sent successfully",
      });
    } catch (error) {
      res.status(404).send("error:" + error.message);
    }
  },
);

export { requestRoutes };
