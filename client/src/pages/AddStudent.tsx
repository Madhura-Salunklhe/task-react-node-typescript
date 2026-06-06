import { useState, useEffect } from "react";
import { getStudentById } from "../services/studentService";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StudentForm from "../components/StudentForm";

import type { Student } from "../types/student";
import { useParams } from "react-router-dom";

const AddStudent = () => {
    const { id } = useParams();
    console.log(id);

    const [selectedStudent, setSelectedStudent] =
        useState<Student | null>(null);

    const fetchStudent = async () => {
        if (!id) return;

        try {
            const res = await getStudentById(id);
            setSelectedStudent(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
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
                        fetchStudents={() => {}}
                        clearEdit={clearEdit}
                    />

                </div>

            </div>

        </div>
    );
};

export default AddStudent;