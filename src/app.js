import express from "express";
import connectDB from "./config/database.js";

const App = express();

connectDB().then(()=>{
    console.log("successfully connected to database");
    App.listen(7777, ()=> {
        console.log("successfully listened to port no. 7777");
        
    })
    
}).catch(()=>{
    console.error("connot connect ");
    
})

