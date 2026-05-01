import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    process.env.DB_SECRET_KEY,
  );
};


export default connectDB