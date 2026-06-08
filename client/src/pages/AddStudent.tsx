import { useState, useEffect } from "react";
import { getStudentById } from "../services/studentService";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StudentForm from "../components/StudentForm";

import type { Student } from "../types/student";
import { useParams } from "react-router-dom";
import { decryptField } from "../utils/crypto";

const AddStudent = () => {


    const { id } = useParams();

    const [selectedStudent, setSelectedStudent] =
        useState<Student | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            if (!id) return;

            try {
                const response =
                    await getStudentById(id);

                const student = response.data;

                setSelectedStudent({
                    ...student,

                    fullName: decryptField(student.fullName),
                    email: decryptField(student.email),
                    phoneNumber: decryptField(
                        student.phoneNumber
                    ),
                    dob: decryptField(student.dob),
                    gender: decryptField(student.gender),
                    address: decryptField(student.address),
                    courseEnrolled: decryptField(
                        student.courseEnrolled
                    ),
                    password: decryptField(
                        student.password
                    ),
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchStudent();
    }, [id]);



    const clearEdit = () => {
        setSelectedStudent(null);
    };

    return (
        <div className="dashboard">

            <Sidebar
                onLogout={() => { }}
                onDeleteAccount={() => { }}
            />

            <div className="main">

                <Header />

                <div className="content-card">

                    <StudentForm
                        selectedStudent={selectedStudent}
                        fetchStudents={() => { }}
                        clearEdit={() =>
                            setSelectedStudent(null)
                        }
                    />

                </div>

            </div>

        </div>
    );
};

export default AddStudent;