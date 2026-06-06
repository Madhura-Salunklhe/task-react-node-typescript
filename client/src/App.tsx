import { useEffect, useState } from "react";

import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

import { Student } from "./types/student";
import { getStudents } from "./services/studentService";
import { decryptField } from "./utils/crypto";

function App() {
  const [students, setStudents] = useState<Student[]>([]);
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

  return (
    <div className="container">
      <LoginForm />

      <StudentForm
        selectedStudent={selectedStudent}
        fetchStudents={fetchStudents}
        clearEdit={clearEdit}
      />

      <StudentList
        students={students}
        fetchStudents={fetchStudents}
        setSelectedStudent={setSelectedStudent}
      />
    </div>
  );
}

export default App;