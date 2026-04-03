import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";

const App = express();

const user = userModel;

App.use(express.json());

App.post("/signup", async (req, res) => {
  const User = new user(req.body);
  try {
    await User.save();
    res.send("user added successfully");
  } catch (error) {
    res.status(400).send("error:" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("successfully connected to database");
    App.listen(7777, () => {
      console.log("successfully listened to port no. 7777");
    });
  })
  .catch((err) => {
    console.error(err);
  });
