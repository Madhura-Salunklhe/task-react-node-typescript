
import express from "express";
import {
  registerUser,
  loginUser,
  deleteAccount,
} from "../controllers/authController";

import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete(
  "/delete-account",
  authenticateToken,
  deleteAccount
);

export default router;