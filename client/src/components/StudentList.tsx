import { deleteStudent } from "../services/studentService";
import { Student } from "../types/student";

interface Props {
  students: Student[];
  fetchStudents: () => void;
  setSelectedStudent: (student: Student) => void;
}

const StudentList = ({
  students,
  fetchStudents,
  setSelectedStudent,
}: Props) => {

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteStudent(id);

      alert(response.data.message);

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container">
      <h2>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.courseEnrolled}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => setSelectedStudent(student)}
                >
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    student._id && handleDelete(student._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;