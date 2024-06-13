import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
  {
    eventName: {
      type: String,
    },
    eventDate: {
      type: String,
    },
    eventTime: {
      type: String,
    },
    eventLocation: {
      type: String,
    },
    eventDescription: {
      type: String,
    },
    eventImages: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Events", EventSchema);

export default Tweet;
