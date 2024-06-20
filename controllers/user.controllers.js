import User from "../models/user.model.js";
import { createAccesToken } from "./../libs/jwt.js";
import Tweets from '../models/tweets.model.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { name, lastName, username, email, password, image: imageFromBody } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    let image = imageFromBody;
    if (!image) {
      image = "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg";
    }

    const newUser = new User({
      name,
      lastName,
      username,
      email,
      password,
      image,
    });

    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = await createAccesToken(payload);
    res.cookie("token", token);

    res.status(200).json({
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      image: user.image,
      token: token,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) return res.status(404).json({ message: "User not found" });
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      image: user.image,
      token: token,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const tweets = await Tweets.find({ user: id }).populate("user", "name username image");

    const response = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
      tweets: tweets || [],
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getSingleUserByUsername = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const tweets = await Tweets.find({ user: user._id }).populate("user", "name username image");

    const response = {
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
      tweets: tweets || [],
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchUsersByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const users = await User.find({ username: { $regex: username, $options: 'i' } });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const usersWithTweets = await Promise.all(users.map(async (user) => {
      const tweets = await Tweets.find({ user: user._id }).populate("user", "name username image");
      return {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        tweets: tweets || [],
      };
    }));

    res.status(200).json(usersWithTweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};