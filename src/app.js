import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";

const App = express();

const user = userModel;

App.post("/signup", async (req, res) => {
  const User = new user({
    firstName: "Kashaf",
    lastName: "Khan",
    emailId: "kashaf@gmail.com",
    password: "kashaf123@",
  });

  await User.save();
  res.send("user added successfully")
});

connectDB()
  .then(() => {
    console.log("successfully connected to database");
    App.listen(7777, () => {
      console.log("successfully listened to port no. 7777");
    });
  })
  .catch(() => {
    console.error("connot connect ");
  });
