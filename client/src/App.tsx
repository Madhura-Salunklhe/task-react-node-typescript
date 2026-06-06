// import { useEffect, useState } from "react";

// import StudentForm from "./components/StudentForm";
// import StudentList from "./components/StudentList";
// import LoginForm from "./components/LoginForm";

// import { getStudents } from "./services/studentService";
// import { decryptField } from "./utils/crypto";
// import type { Student } from "./types/student";

// function App() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [selectedStudent, setSelectedStudent] =
//     useState<Student | null>(null);

//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem("token")
//   );

//   const fetchStudents = async () => {
//     try {
//       const response = await getStudents();

//       const decryptedStudents = response.data.map(
//         (student: Student) => ({
//           ...student,
//           fullName: decryptField(student.fullName),
//           email: decryptField(student.email),
//           phoneNumber: decryptField(student.phoneNumber),
//           dob: decryptField(student.dob),
//           gender: decryptField(student.gender),
//           address: decryptField(student.address),
//           courseEnrolled: decryptField(
//             student.courseEnrolled
//           ),
//           password: decryptField(student.password),
//         })
//       );

//       setStudents(decryptedStudents);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchStudents();
//     }
//   }, [isLoggedIn]);

//   const clearEdit = () => {
//     setSelectedStudent(null);
//   };

//   if (!isLoggedIn) {
//     return (
//       <LoginForm onLogin={() => setIsLoggedIn(true)} />
//     );
//   }

//   return (
//     <div className="container">
//       <StudentForm
//         selectedStudent={selectedStudent}
//         fetchStudents={fetchStudents}
//         clearEdit={clearEdit}
//       />

//       <StudentList
//         students={students}
//         fetchStudents={fetchStudents}
//         setSelectedStudent={setSelectedStudent}
//       />
//     </div>
//   );
// }

// export default App;

import { useState } from "react";

import LoginForm from "./components/LoginForm";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  if (!isLoggedIn) {
    return (
      <LoginForm
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  return (

    <Routes>

      <Route
        path="/dashboard"
        element={
          <Dashboard
            onLogout={() =>
              setIsLoggedIn(false)
            }
          />
        }
      />

      <Route
        path="/students"
        element={<Students />}
      />

      <Route
        path="/add-student/:id?"
        element={<AddStudent />}
      />

      <Route
        path="*"
        element={
          <Navigate to="/dashboard" />
        }
      />

    </Routes>

  );
}

export default App;