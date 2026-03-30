import express from "express";

const App = express();

App.use((req,res)=>{
    res.send("hello from the server")
} )

App.listen(7777, ()=> {
    console.log("successfully listened oo port no. 7777");
    
})