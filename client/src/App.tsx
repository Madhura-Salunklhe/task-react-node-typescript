import { useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import LoginForm from "./components/LoginForm";

function App() {
  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const fetchStudents = () => {
    window.location.reload();
  };

  const clearEdit = () => {
    setSelectedStudent(null);
  };

//   return (
//     <div>
//       <StudentForm
//         selectedStudent={selectedStudent}
//         fetchStudents={fetchStudents}
//         clearEdit={clearEdit}
//       />

//       <hr />

//       <StudentList
//         setSelectedStudent={setSelectedStudent}
//       />
//     </div>
//   );
// }
return (
  <div className="container">
    <LoginForm />

    <StudentForm
      selectedStudent={selectedStudent}
      fetchStudents={fetchStudents}
      clearEdit={clearEdit}
    />

    <StudentList
      setSelectedStudent={setSelectedStudent}
    />
  </div>
);
}

export default App;