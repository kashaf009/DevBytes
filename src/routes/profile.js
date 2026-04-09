import express from "express"
import { userAuth } from "../middleware/auth.js";


const profileRoutes = express.Router()

// profile api

profileRoutes.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("profile of:" + user);
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
});


export{
    profileRoutes
}