// import { Request, Response } from "express";
// import Student from "../models/Student";
// import { encryptData, decryptData } from "../utils/crypto";

// export const registerStudent = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const encryptedPayload = req.body.data;

//     // second encryption
//     const doubleEncryptedData = encryptData(encryptedPayload);

//     const student = new Student({
//       fullName: doubleEncryptedData,
//       email: doubleEncryptedData,
//       phoneNumber: doubleEncryptedData,
//       dob: doubleEncryptedData,
//       gender: doubleEncryptedData,
//       address: doubleEncryptedData,
//       courseEnrolled: doubleEncryptedData,
//       password: doubleEncryptedData,
//     });

//     await student.save();

//     res.status(201).json({
//       message: "Student Registered",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//       error,
//     });
//   }
// };

import { Request, Response } from "express";
import Student from "../models/Student";
import {
  encryptData,
  decryptData,
} from "../utils/crypto";

export const registerStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dob,
      gender,
      address,
      courseEnrolled,
      password,
    } = req.body;

    const student = new Student({
      fullName: encryptData(fullName),
      email: encryptData(email),
      phoneNumber: encryptData(phoneNumber),
      dob: encryptData(dob),
      gender: encryptData(gender),
      address: encryptData(address),
      courseEnrolled: encryptData(courseEnrolled),
      password: encryptData(password),
    });

    await student.save();

    res.status(201).json({
      message: "Student Registered",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

//get all student
export const getStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const students = await Student.find();

    // decrypt only ONE level
    const partiallyDecryptedStudents = students.map(
      (student) => ({
        _id: student._id,

        fullName: decryptData(student.fullName),
        email: decryptData(student.email),
        phoneNumber: decryptData(student.phoneNumber),
        dob: decryptData(student.dob),
        gender: decryptData(student.gender),
        address: decryptData(student.address),
        courseEnrolled: decryptData(student.courseEnrolled),
        password: decryptData(student.password),
      })
    );

    res.status(200).json(partiallyDecryptedStudents);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

//delete controller
export const deleteStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.status(200).json({
      message: "Student Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

//update controller
export const updateStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      fullName,
      email,
      phoneNumber,
      dob,
      gender,
      address,
      courseEnrolled,
      password,
    } = req.body;

    await Student.findByIdAndUpdate(id, {
      fullName: encryptData(fullName),
      email: encryptData(email),
      phoneNumber: encryptData(phoneNumber),
      dob: encryptData(dob),
      gender: encryptData(gender),
      address: encryptData(address),
      courseEnrolled: encryptData(
        courseEnrolled
      ),
      password: encryptData(password),
    });

    res.status(200).json({
      message: "Student Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};