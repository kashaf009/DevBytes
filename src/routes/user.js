import express from "express";

import { userAuth } from "../middleware/auth.js";
import connectionRequest from "../models/connectionRequest.js";
import user from "../models/userModel.js";
import { set } from "mongoose";

const userRoutes = express.Router();

const SAFE_USER_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoUrl",
  "about",
  "skills",
];

// get all the connection request recieved
userRoutes.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const requestData = await connectionRequest
      .find({
        toUserId: loginUser._id,
        status: "requested",
      })
      .populate("fromUserId", SAFE_USER_DATA);

    res.json({ message: "Data fetched sucessfully", data: requestData });
  } catch (error) {
    res.status(404).json({
      message: "error " + error.message,
    });
  }
});

// get all connection

userRoutes.get("/user/connections", userAuth, async (req, res) => {
  try {
    const currentUser = req.user;

    const connectionRequestData = await connectionRequest
      .find({
        $or: [
          { fromUserId: currentUser._id, status: "accepted" },
          { toUserId: currentUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", SAFE_USER_DATA)
      .populate("toUserId", SAFE_USER_DATA);

    const data = connectionRequestData.map((data) => {
      if (data.fromUserId._id.equals(currentUser._id)) {
        return data.toUserId;
      } else {
        return data.fromUserId;
      }
    });

    res.json({ connection: data });
  } catch (error) {
    res.status(404).json({
      message: "Error" + error.message,
    });
  }
});

// get feed
userRoutes.get("/feed", userAuth, async (req, res) => {
  try {
    // Don't show connections, ignore, accepted in the feed.

    const loginUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit

    const skip = (page-1)*limit


    const connectionRequestData = await connectionRequest
      .find({
        $or: [{ fromUserId: loginUser._id }, { toUserId: loginUser._id }],
      })
      .select("fromUserId  toUserId");

    

    const uniqueIds = new Set();


    connectionRequestData.forEach((data) => {
      uniqueIds.add(data.fromUserId._id.toString());
      uniqueIds.add(data.toUserId._id.toString());
    });

    // console.log(uniqueIds);
    

    const hideProfileData = await user.find({
      $and: [
        { _id: { $nin: Array.from(uniqueIds) } },
        { _id: { $ne: loginUser._id } },
      ],
    }).select(SAFE_USER_DATA).skip(skip).limit(limit);

    res.json( hideProfileData );


  } catch (error) {
    res.status(404).json({ message: "Error" + error.message });
  }
});

export { userRoutes };
