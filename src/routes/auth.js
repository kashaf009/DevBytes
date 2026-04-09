import express from "express";
import  validateSignup  from "../utils/validate.js";
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js";

const user = userModel;

const authRoutes = express.Router()
// signup
authRoutes.post("/signup", async (req, res) => {
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


// login
authRoutes.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId) {
      throw new Error("Enter emailid");
    }

    const verifiedUser = await user.findOne({ emailId: emailId });

    if (!verifiedUser) {
      throw new Error("Invalid credential");
    }

    const verifyPass = await bcrypt.compare(password, verifiedUser.password);

    if (verifyPass) {
      // create jwt token

      const token = await verifiedUser.getJWT();
      // pass token in cookie

      res.cookie("token", token);
      
      

      res.send("login successful");
    } else {
      throw new Error("Invalid");
    }
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
});


export {
    authRoutes
}