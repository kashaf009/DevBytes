import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String
    },
    emailId: {
        type:String,
        required:true,
        lowercase:true
    },  
    password: {
        type:String,
        required:true
    },
    age: {
        type:Number
    },
    gender:{
        type:String
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVE7sMtLdrFVWAef8WEWzR9TzkKPCj9Gd1xpavbjYKkvQADVy4&s"
    },
    skills:{
        type:String,

    },
    about:{
        type:String,
    }

})

const userModel = mongoose.model("user",userSchema)

export default userModel