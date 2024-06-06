import mongoose, { Schema } from "mongoose";

const TweetSchema = new Schema(
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

const Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;
