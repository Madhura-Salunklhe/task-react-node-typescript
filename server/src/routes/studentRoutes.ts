import express from "express";

import {
  registerStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} from "../controllers/studentController";

const router = express.Router();

router.post("/register", registerStudent);

router.get("/students", getStudents);

router.delete("/student/:id", deleteStudent);

router.put("/student/:id", updateStudent);

export default router;