import { text } from "express";
import Tweets from "../models/tweets.model.js";
import User from "../models/user.model.js";

export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweets.find();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTweet = async (req, res) => {
  const tweet = req.body;

  try {
    const newTweet = await new Tweets({
      text: tweet.text,
      images: tweet.images,
      type: tweet.type,
      user: req.user.id,
    }).save();
    const foundUser = await User.findById(req.user.id);
    res.status(200).json({
      text: newTweet.text,
      images: newTweet.images,
      type: newTweet.type,
      userName: foundUser.username,
      userUsername: foundUser.username,
      userImage: foundUser.image,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) return res.status(404).json({ message: "Tweet not found" });
    await Tweets.findByIdAndDelete({ _id_: id });

    res.status(200).json({ message: "Tweet deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
