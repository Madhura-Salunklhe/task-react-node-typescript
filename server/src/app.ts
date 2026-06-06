import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", studentRoutes);
app.use("/api/auth", authRoutes);

export default app;