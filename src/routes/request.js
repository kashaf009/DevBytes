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

export { requestRoutes };
