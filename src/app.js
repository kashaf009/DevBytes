import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";

const App = express();

const user = userModel;

App.use(express.json());

// post signup

App.post("/signup", async (req, res) => {
  const User = new user(req.body);
  const existingUser = await user.findOne({ emailId: req.body.emailId });



  try {
    if(existingUser){
      res.send("user already exist")
    }
    else{
    
    await User.save();
    res.send("user added successfully");}
  
  
  } catch (error) {

    if(error.code === 11000){
      res.status(404).send("email already exist")
    }
    else{
    res.status(400).send("error:" + error.message);}
  }
});

// get user

App.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const userinfo = await user.find({ emailId: userEmail });

    if (userinfo.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(userinfo);

      console.log("finding successfull");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// get feed

App.get("/feed", async (req, res) => {
  try {
    const feedUser = await user.find({});
    res.send(feedUser);
  } catch (error) {
    res.status(404).send("something wend wrong");
  }
});

// delete user

App.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await user.findByIdAndDelete(userId);
    res.send("delete user successfully");
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

// update user

App.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  // console.log(userId);
  // console.log(data);

  try {
    const updateUser = await user.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runvalidator: true,
    });
    res.send("user updated successfully" + updateUser);
    console.log(updateUser);

    // console.log("updated user");
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

// update by emailId

App.patch("/user/email", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;

  try {
    const findUser = await user.findOne({ emailId: emailId });

    if(!findUser){
      res.send("no user found with this")
    }

    const updateUser = await user.findOneAndUpdate(findUser, data, {
      returnDocument: "after",
      runValidators:true
    });

    console.log(updateUser);

    res.send("user updated " + updateUser);
  } catch (error) {
    res.status(404).send("something went wrong");
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
