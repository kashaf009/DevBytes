import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  // get token form cookies

  try {
    const { token } = await req.cookies;
    if (!token) {
      return res.status(401).send("please login");
    }
    const decodedValue = await jwt.verify(token, "Dev@Bytes@99$");

    const { _id } = decodedValue;

    const user = await userModel.findById({ _id: _id });

    if (!user) {
      throw new Error("user not found");
    }

    req.user=user
    next();

  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
};

export{
    userAuth,
}
