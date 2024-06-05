import {
  getAllTweets,
  createTweet,
  deleteTweet,
  getUserTweets,
  getUserEvents,
  getUserMedia
} from "../controllers/tweets.controllers.js";
import { Router } from "express";
import { AuthRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/tweets", getAllTweets);
router.post("/tweets", AuthRequired, createTweet);
router.delete("/:id", AuthRequired, deleteTweet);
router.get("/tweets/:id", AuthRequired, getUserTweets);
router.get("/tweets/events/:id", AuthRequired, getUserEvents);
router.get("/tweets/media/:id", AuthRequired, getUserMedia);

export default router;
