import mongoose, { Schema } from "mongoose";

const User = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", User);
