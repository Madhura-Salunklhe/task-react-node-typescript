import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import { useEffect, useState } from "react";

import { getStudents } from "../services/studentService";
import { decryptField } from "../utils/crypto";
import type { Student } from "../types/student";

const Students=()=>{
    const [students, setStudents] = useState<Student[]>([]);
const [selectedStudent, setSelectedStudent] =
  useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      console.log("API Response:", response.data);

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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  fetchStudents();
}, []);

    return(

        <div className="dashboard">

            <Sidebar
                onLogout={()=>{}}
                onDeleteAccount={()=>{}}
            />

            <div className="main">

                <Header/>

                <div className="content-card">

                    <StudentList
  students={students}
  fetchStudents={fetchStudents}
  setSelectedStudent={setSelectedStudent}
/>

                </div>

            </div>

        </div>

    )

}

export default Students;