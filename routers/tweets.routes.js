import {
  getAllTweets,
  createTweet,
  deleteTweet,
} from "../controllers/tweets.controllers.js";
import { Router } from "express";
import { AuthRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/tweets", AuthRequired, getAllTweets);
router.post("/tweets", AuthRequired, createTweet);
router.delete("/:id", AuthRequired, deleteTweet);

export default router;
