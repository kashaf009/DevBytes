import express from "express";
import connectDB from "./config/database.js";
import userModel from "./models/userModel.js";
import cookieParser from "cookie-parser";
import { userAuth } from "./middleware/auth.js";
import { authRoutes } from "./routes/auth.js";
import { profileRoutes } from "./routes/profile.js";

const App = express();

const user = userModel;

// parsers
App.use(express.json());
App.use(cookieParser());

App.use("/" , authRoutes)
App.use("/", profileRoutes)




// sendconnectionrequest 

App.post("/sendconnectionrequest" ,userAuth, async (req,res)=> {
  try {
    const user=req.user;
  
    res.send( user.firstName + " send connection request")
    
  } catch (error) {
    res.status(404).send("error:" + error.message)
    
  }
  

})

// get user

// App.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const userinfo = await user.find({ emailId: userEmail });

//     if (userinfo.length === 0) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(userinfo);

//       console.log("finding successfull");
//     }
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// });

// get feed

// App.get("/feed", async (req, res) => {
//   try {
//     const feedUser = await user.find({});
//     res.send(feedUser);
//   } catch (error) {
//     res.status(404).send("something wend wrong");
//   }
// });

// delete user

// App.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     await user.findByIdAndDelete(userId);
//     res.send("delete user successfully");
//   } catch (error) {
//     res.status(404).send("something went wrong");
//   }
// });

// update user

// App.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;
//   // console.log(userId);
//   // console.log(data);

//   try {
//     const allowedUpdate = ["userId", "photoUrl", "about", "skills", "gender"];

//     const validateUpdate = Object.keys(data).every((k) =>
//       allowedUpdate.includes(k),
//     );

//     if (!validateUpdate) {
//       throw new Error("update not allowed");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     if (data?.about.length > 60) {
//       throw new Error("about should be in less than 60 words");
//     }

//     const updateUser = await user.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runvalidator: true,
//     });
//     res.send("user updated successfully");
//     console.log(updateUser);

//     // console.log("updated user");
//   } catch (error) {
//     res.status(404).send("something went wrong:" + error.message);
//   }
// });

// update by emailId

// App.patch("/user/email", async (req, res) => {
//   const emailId = req.body.emailId;
//   const data = req.body;

//   try {
//     const allowedUpdate = ["photoUrl", "about", "skills", "gender"];

//     const validateUpdate = Object.keys(data).every((k) =>
//       allowedUpdate.includes(k),
//     );

//     if (!validateUpdate) {
//       throw new Error("update not allowed");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }

//     if (data?.about.length > 60) {
//       throw new Error("about should be in less than 60 words");
//     }

//     const findUser = await user.findOne({ emailId: emailId });

//     if (!findUser) {
//       res.send("no user found with this");
//     }

//     const updateUser = await user.findOneAndUpdate(findUser, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });

//     // console.log(updateUser);

//     res.send("user updated " + updateUser);
//   } catch (error) {
//     res.status(404).send("something went wrong :" + error.message);
//   }
// });

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
