import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

export default router;
