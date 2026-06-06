import axios from "axios";
import { Student } from "../types/student";

const API = "http://localhost:5000/api";

export const getStudents = () => axios.get(`${API}/students`);

export const createStudent = (student: Student) =>
  axios.post(`${API}/register`, student);

export const updateStudent = (id: string, student: Student) =>
  axios.put(`${API}/student/${id}`, student);

export const deleteStudent = (id: string) =>
  axios.delete(`${API}/student/${id}`);