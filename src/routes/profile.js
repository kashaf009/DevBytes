import express from "express"
import { userAuth } from "../middleware/auth.js";
import { verifyUserEdit } from "../utils/validate.js";


const profileRoutes = express.Router()

//get profile api

profileRoutes.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send("profile of:" + user);
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
});

// edit profile

profileRoutes.patch("/profile/edit",userAuth, async (req,res)=>{

    try {
        const loginedUser = req.user;
        if(!verifyUserEdit(req)){
          throw new Error("invalid edit request");
          
        }
        console.log(loginedUser);
         

        Object.keys(req.body).forEach(keys=> loginedUser[keys] = req.body[keys])
        console.log(loginedUser);

        loginedUser.save();

        res.send(`${loginedUser.firstName}, your profile is updated successfully`)
       
        
        
    } catch (error) {
        res.status(404).send("Error:" + error.message)
    }

})


export{
    profileRoutes
}