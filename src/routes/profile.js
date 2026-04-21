import express from "express";
import { userAuth } from "../middleware/auth.js";
import { verifyUserEdit } from "../utils/validate.js";
import validator from "validator";
import bcrypt from "bcrypt";

const profileRoutes = express.Router();

//get profile api

profileRoutes.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

        res.json(user);
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
});

// edit profile

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loginedUser = req.user;
    if (!verifyUserEdit(req)) {
      throw new Error("invalid edit request");
    }
    // console.log(loginedUser);

    Object.keys(req.body).forEach(
      (keys) => (loginedUser[keys] = req.body[keys]),
    );
    // console.log(loginedUser);

    loginedUser.save();

    res.json({ message:`${loginedUser.firstName}, your profile is updated successfully`,
      user: loginedUser}
    );
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
});

// change password

profileRoutes.patch("/profile/changepassword", userAuth, async (req, res) => {
  try {
    const loginedUser = req.user;
    const { currentPassword, newPassword } = req.body;

    // const hashCurrentPass = await bcrypt.hash(currentPassword,10)
    // match password
    const matchPass = await bcrypt.compare(
      currentPassword,
      loginedUser.password
      
    );

    if (!matchPass) {
      throw new Error("enter correct password");
    }

    // check strong password
    const isStrong =await validator.isStrongPassword(newPassword);

    if (!isStrong) {
      throw new Error("enter strong password");
    }

    // hash new password

    const hashNewPass = await bcrypt.hash(newPassword, 10);

    loginedUser.password = hashNewPass;

    await loginedUser.save();

    res.send("password changed successfully")
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
});

export { profileRoutes };
