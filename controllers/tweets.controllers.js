import Tweets from "../models/tweets.model.js";

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
      authorProfilePhoto: tweet.authorProfilePhoto,
      authorName: tweet.authorName,
      authorUserName: tweet.authorUserName,
      text: tweet.text,
      images: tweet.images,
    }).save();

    res.status(200).json(newTweet);
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
