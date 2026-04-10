import mongoose from "mongoose";

const ConnectionRequestsSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "requested", "accepted", "rejected"],
        message: `{VALUE} is invalid`,
      },
      required: true,
    },
  },
  { timestamps: true },
);

const connectionRequestModel =mongoose.model("connectionRequests", ConnectionRequestsSchema)

export default connectionRequestModel

