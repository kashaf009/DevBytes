import mongoose from "mongoose";
import validator from "validator"




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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid emailid" + value);
                
                
            }
        }
        
    },  
    password: {
        type:String,
        minLength:8,
        maxLength:18,
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
                throw new Error("gender is invalid");
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
        maxLength:60,
        default:"hey,welcome to my profile."
    }

},{timestamps:true})

const userModel = mongoose.model("user",userSchema)

export default userModel