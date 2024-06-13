import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events'
  }]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
