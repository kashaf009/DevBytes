import express from "express";
import { userAuth } from "../middleware/auth.js";
import ConnectionRequest from "../models/connectionRequest.js";
import user from "../models/userModel.js";

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

      // bug fixed : cannot send request to yourself
      if (fromUserId.equals(toUserId)) {
        throw new Error("You cannot send request to yourself");
      }

      const toUser = await user.findById(toUserId);
      if (!toUser) {
        res.json({
          message: "used does not exist",
          user: toUserId,
        });
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
        res.json({ message: "Connection Request Already Exists" });
      }

      if (status === "requested") {
        res.json({
          message: `Connection request sent to ${toUser.firstName} successfully`,
        });
      } else if (status === "ignored") {
        res.json({
          message: req.user.firstName + " " + status + " " + toUser.firstName,
        });
      }
    } catch (error) {
      res.status(404).send("error:" + error.message);
    }
  },
);

requestRoutes.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loginUser = req.user;
      const requestId = req.params.requestId;
      const status = req.params.status;

      // validated status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }
      // check requestid(valid or not)
      const connectionData = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loginUser._id,
        status: "requested",
      });

      if (!connectionData) {
        throw new Error("connection request not found");
      }

      connectionData.status= status;

     const data = await connectionData.save();

     res.json({message : "connection request " + status ,data})

      
    } catch (error) {
      res.status(400).json({message : "ERROR:" + error.message});
    }
  },
);

export { requestRoutes };
