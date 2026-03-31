import express from "express";

const App = express();

App.use( "/test/4" ,(req,res)=>{
    res.send("hello from the test 4 server")
} )

App.use( "/test" ,(req,res)=>{
    res.send("hello from the test server")
} )


App.use( "/" ,(req,res)=>{
    res.send("hello from the server")
} )

App.listen(7777, ()=> {
    console.log("successfully listened oo port no. 7777");
    
})