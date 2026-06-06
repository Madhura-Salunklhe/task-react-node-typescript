import axios from "axios";
import type { Student } from "../types/student";

const API = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API,
});

// Add JWT token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getStudents = () => api.get("/students");

export const createStudent = (student: Student) =>
  api.post("/register", student);

export const updateStudent = (
  id: string,
  student: Student
) => api.put(`/student/${id}`, student);

export const deleteStudent = (id: string) =>
  api.delete(`/student/${id}`);

export const getStudentById = (id: string) =>
  api.get(`/student/${id}`);