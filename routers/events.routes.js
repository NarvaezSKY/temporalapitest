import { getAllEvents, createEvent, deleteEvent } from "../controllers/events.controller.js";
import { Router } from "express";
import { AuthRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/events", AuthRequired, getAllEvents);
router.post("/events", AuthRequired, createEvent);
router.delete("/events/:id", AuthRequired, deleteEvent);

export default router