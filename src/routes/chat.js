import express from "express";
import { appendFile } from "fs";
import { userAuth } from "../middleware/auth.js";
import chat from "../models/chat.js";

const chatRoute = express.Router();

chatRoute.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const loginUserId = req.user._id;
    const {targetUserId}  = req.params;

    let chatid =await chat.findOne({
      participants: { $all:[loginUserId, targetUserId] },
    }).populate({
        path:"messages.sender",
        select:"firstName lastName"

    });
    if (!chatid) {
        chatid = new chat({
            participants:[loginUserId,targetUserId],
            messages:[]
        })
        await chatid.save()
    }

    res.json(chatid)

  } catch (error) {
    console.log(error);
  }
});

export default chatRoute;
