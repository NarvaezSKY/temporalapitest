import {
  getAllTweets,
  createTweet,
  deleteTweet,
} from "../controllers/tweets.controllers.js";
import { Router } from "express";

const router = Router();

router.get("/tweets", getAllTweets);
router.post("/tweets", createTweet);
router.delete("/:id", deleteTweet);

export default router;
