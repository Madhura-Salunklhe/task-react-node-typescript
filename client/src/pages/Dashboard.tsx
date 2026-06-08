import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

import { getStudents } from "../services/studentService";
import { decryptField } from "../utils/crypto";
import type { Student } from "../types/student";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  console.log("Students State:", students);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      const decryptedStudents = response.data.map(
  (student: Student) => ({
    ...student,

    fullName: decryptField(student.fullName),
    email: decryptField(student.email),
    phoneNumber: decryptField(student.phoneNumber),
    dob: decryptField(student.dob),
    gender: decryptField(student.gender),
    address: decryptField(student.address),
    courseEnrolled: decryptField(
      student.courseEnrolled
    ),
    password: decryptField(student.password),
  })
);

setStudents(decryptedStudents);
      console.log("API Response:", response.data);

     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const clearEdit = () => {
    setSelectedStudent(null);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        "http://localhost:5000/api/auth/delete-account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();

      onLogout();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to delete account"
      );
    }
  };

  return (
    <div className="dashboard">

      <Sidebar
        onDeleteAccount={handleDeleteAccount}
        onLogout={() => {
          localStorage.clear();
          onLogout();
        }}
      />

      <div className="main">

        <Header />

        {/* <div className="content-card">
          <StudentForm
            selectedStudent={selectedStudent}
            fetchStudents={fetchStudents}
            clearEdit={clearEdit}
          />
        </div> */}

        <div className="content-card">
          <StudentList
            students={students}
            fetchStudents={fetchStudents}
            setSelectedStudent={setSelectedStudent}
          />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;