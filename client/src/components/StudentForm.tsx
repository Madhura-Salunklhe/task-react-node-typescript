import { useEffect, useState } from "react";
import axios from "axios";
import { encryptField } from "../utils/crypto";

interface Props {
  selectedStudent: any;
  fetchStudents: () => void;
  clearEdit: () => void;
}

const StudentForm = ({
  selectedStudent,
  fetchStudents,
  clearEdit,
}: Props) => {
  useEffect(() => {
  if (selectedStudent) {
    setFormData(selectedStudent);
  }
}, [selectedStudent]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    address: "",
    courseEnrolled: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (
  //   e: React.FormEvent
  // ) => {
  //   e.preventDefault();

  //   try {
  //     // frontend encryption
  //     const encryptedData = {
  //       fullName: encryptField(formData.fullName),
  //       email: encryptField(formData.email),
  //       phoneNumber: encryptField(formData.phoneNumber),
  //       dob: encryptField(formData.dob),
  //       gender: encryptField(formData.gender),
  //       address: encryptField(formData.address),
  //       courseEnrolled: encryptField(formData.courseEnrolled),
  //       password: encryptField(formData.password),
  //     };

  //     const response = await axios.post(
  //       "http://localhost:5000/api/register",
  //       {
  //         encryptedData
  //       }
  //     );

  //     alert(response.data.message);

  //     setFormData({
  //       fullName: "",
  //       email: "",
  //       phoneNumber: "",
  //       dob: "",
  //       gender: "",
  //       address: "",
  //       courseEnrolled: "",
  //       password: "",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const encryptedData = {
      fullName: encryptField(formData.fullName),
      email: encryptField(formData.email),
      phoneNumber: encryptField(formData.phoneNumber),
      dob: encryptField(formData.dob),
      gender: encryptField(formData.gender),
      address: encryptField(formData.address),
      courseEnrolled: encryptField(
        formData.courseEnrolled
      ),
      password: encryptField(formData.password),
    };

    let response;

    // EDIT MODE
    if (selectedStudent) {
      response = await axios.put(
        `http://localhost:5000/api/student/${selectedStudent._id}`,
        encryptedData
      );

      clearEdit();
    } else {
      // CREATE MODE
      response = await axios.post(
        "http://localhost:5000/api/register",
        encryptedData
      );
    }

    alert(response.data.message);

    fetchStudents();

    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      gender: "",
      address: "",
      courseEnrolled: "",
      password: "",
    });
  } catch (error) {
    console.log(error);
  }
};
  return (
  <div className="form-container">
    <h2>
      {selectedStudent
        ? "Update Student"
        : "Student Registration"}
    </h2>

    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="courseEnrolled"
          placeholder="Course Enrolled"
          value={formData.courseEnrolled}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="submit-btn"
      >
        {selectedStudent
          ? "Update Student"
          : "Register Student"}
      </button>
    </form>
  </div>
);
};

export default StudentForm;