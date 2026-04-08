import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 15,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 10,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid emailid" + value);
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 80,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("gender is invalid");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("enter valid url");
        }
      },
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVE7sMtLdrFVWAef8WEWzR9TzkKPCj9Gd1xpavbjYKkvQADVy4&s",
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      maxLength: 60,
      default: "hey,welcome to my profile.",
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
    const verifiedUser=this;
  const token = await jwt.sign({ _id: verifiedUser._id }, "Dev@Bytes@99$", {
    expiresIn: "7d",
  });
  return token
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
