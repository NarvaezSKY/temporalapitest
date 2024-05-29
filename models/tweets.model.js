import mongoose, { Schema } from "mongoose";

const Tweets = new Schema(
  {
    authorProfilePhoto: {
      type: String,
    },
    authorName: {
      type: String,
    },
    authorUserName: {
      type: String,
    },
    text: {
      type: String,
    },
    images: {
      type: [String],
    }
  },
  { timestamps: true }
);
export default mongoose.model("Tweets", Tweets);
