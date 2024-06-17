import { Router } from "express";
import {
  getAllUsers,
  register,
  deleteUser,
  login,
  verifyToken,
  profile,
  getSingleUser,
  getSingleUserByUsername
} from "../controllers/user.controllers.js";
import { AuthRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/users", AuthRequired, getAllUsers);
router.post("/users/register", register);
router.delete("/users/:id", AuthRequired, deleteUser);
router.post ("/users/login", login);
router.post ("/users/verifyToken", AuthRequired, verifyToken);
router.get('/users/profile', AuthRequired, profile);
router.get('/users/:id', AuthRequired, getSingleUser);
router.get('/users/username/:username', AuthRequired, getSingleUserByUsername);

export default router;
