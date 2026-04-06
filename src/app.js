import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";
import validator from "validator";
import { validateSignup } from "./utils/validate.js";
import bcrypt from "bcrypt";

const App = express();

const user = userModel;

App.use(express.json());

// post signup

App.post("/signup", async (req, res) => {
  try {
    // validate req.body
    validateSignup(req);

    const { firstName, lastName, emailId, password } = req.body;

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    const User = new user({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const existingUser = await user.findOne({ emailId: req.body.emailId });

    if (existingUser) {
      res.send("user already exist");
    } else {
      if (User?.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
      }
      if (User?.about.length > 60) {
        throw new Error("about should be in less than 60 words");
      }

      await User.save();
      res.send("user added successfully");
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(404).send("email already exist");
    } else {
      res.status(400).send("error:" + error.message);
    }
  }
});

// login api

App.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId) {
      throw new Error("Enter emailid");
    }

    const verifiedUser = await user.findOne({ emailId: emailId });

    if (!verifiedUser) {
      throw new Error("Invalid credential");
    }

    const verifyPass = await bcrypt.compare(
      password,
      verifiedUser.password,
    );

    if (verifyPass) {
      res.send("login successful")
    }else{
      throw new Error("Invalid credential");
      
    }
  } catch (error) {
    res.status(404).send("Error:" + error.message);
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
    const allowedUpdate = ["userId", "photoUrl", "about", "skills", "gender"];

    const validateUpdate = Object.keys(data).every((k) =>
      allowedUpdate.includes(k),
    );

    if (!validateUpdate) {
      throw new Error("update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    if (data?.about.length > 60) {
      throw new Error("about should be in less than 60 words");
    }

    const updateUser = await user.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runvalidator: true,
    });
    res.send("user updated successfully");
    console.log(updateUser);

    // console.log("updated user");
  } catch (error) {
    res.status(404).send("something went wrong:" + error.message);
  }
});

// update by emailId

App.patch("/user/email", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;

  try {
    const allowedUpdate = ["photoUrl", "about", "skills", "gender"];

    const validateUpdate = Object.keys(data).every((k) =>
      allowedUpdate.includes(k),
    );

    if (!validateUpdate) {
      throw new Error("update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    if (data?.about.length > 60) {
      throw new Error("about should be in less than 60 words");
    }

    const findUser = await user.findOne({ emailId: emailId });

    if (!findUser) {
      res.send("no user found with this");
    }

    const updateUser = await user.findOneAndUpdate(findUser, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(updateUser);

    res.send("user updated " + updateUser);
  } catch (error) {
    res.status(404).send("something went wrong :" + error.message);
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
