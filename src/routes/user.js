import express from "express";

import { userAuth } from "../middleware/auth.js";
import connectionRequest from "../models/connectionRequest.js";

const userRoutes = express.Router();

const SAFE_USER_DATA = ["firstName" , "lastName" ,"age","gender" ,"photoUrl", "about", "skills" ];

// get all the connection request recieved 
userRoutes.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const requestData = await connectionRequest.find({
      toUserId: loginUser._id,
      status: "requested",
    }).populate("fromUserId" ,SAFE_USER_DATA );

    res.json({ message: "Data fetched sucessfully", data: requestData });
  } catch (error) {
    res.status(404).json({
      message: "error " + error.message,
    });
  }
});

// get all user connection

userRoutes.get("/user/connections", userAuth, async (req,res)=>{

  try {
    const currentUser=req.user;

    const connectionRequestData = await connectionRequest.find({
      $or:[
        {fromUserId:currentUser._id , status:"accepted"},
        {toUserId:currentUser._id, status:"accepted"}
      ]
    }).populate("fromUserId", SAFE_USER_DATA);

    const data = connectionRequestData.map((data)=> data.fromUserId)

    res.json({connection :data})

    
  } catch (error) {
    res.status(404).json({
      message: "Error" + error.message,
    })

    
  }

})

export { userRoutes };
