import { useEffect, useState } from "react";
import axios from "axios";

import { decryptField } from "../utils/crypto";

interface Props {
    setSelectedStudent: any;
}

const StudentList = ({
    setSelectedStudent,
}: Props) => {
    const [students, setStudents] = useState<any[]>([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/students"
            );

            // frontend final decryption
            const decryptedStudents = response.data.map(
                (student: any) => ({
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
    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/student/${id}`
            );

            alert(response.data.message);

            fetchStudents();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

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
                onClick={() =>
                  setSelectedStudent(student)
                }
              >
                Edit
              </button>
            </td>

            <td>
              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(student._id)
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