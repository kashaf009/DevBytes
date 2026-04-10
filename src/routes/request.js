import express from "express";

const requestRoutes = express.Router;

App.post("/sendconnectionrequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " send connection request");
  } catch (error) {
    res.status(404).send("error:" + error.message);
  }
});

