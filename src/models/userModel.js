import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:4,
        maxLength:15
    },
    lastName: {
        type:String,
        minLength:3,
        maxLength:10

    },
    emailId: {
        type:String,
        required:true,
        unique: true,
        lowercase:true,
    },  
    password: {
        type:String,
        minLength:8,
        required:true
    },
    age: {
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if (!["male","female"].includes(value)) {
                throw console.error("gender is invalid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVE7sMtLdrFVWAef8WEWzR9TzkKPCj9Gd1xpavbjYKkvQADVy4&s"
    },
    skills:{
        type:[String],

    },
    about:{
        type:String,
        default:"hey,welcome to my profile."
    }

},{timestamps:true})

const userModel = mongoose.model("user",userSchema)

export default userModel