import mongoose, { Schema } from "mongoose";

const Tweets = new Schema(
  {
    text: {
      type: String,
    },
    images: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
    }
  },
  { timestamps: true }
);
export default mongoose.model("Tweets", Tweets);
