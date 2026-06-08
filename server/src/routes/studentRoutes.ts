import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

import {
  registerStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  getStudentById,
} from "../controllers/studentController";

const router = express.Router();

router.get("/students", authenticateToken, getStudents);

router.post("/register", authenticateToken, registerStudent);

router.get(
  "/student/:id",
  authenticateToken,
  getStudentById
);

router.put("/student/:id", authenticateToken, updateStudent);

router.delete("/student/:id", authenticateToken, deleteStudent);

export default router;