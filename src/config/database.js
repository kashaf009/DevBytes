import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://DevBytes:SyRRtNOFDNRsDYOI@devbytes.zqx9i8a.mongodb.net/DevBytes",
  );
};


export default connectDB