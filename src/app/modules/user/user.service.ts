import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { AcademicSemister } from "../academicSemister/academicSemister.model";
import { TStudent } from "../student/student.interface";
import Student from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { genaretedId, generateAdminId, generateFacultyId } from "./user.utils";
import mongoose from "mongoose";
import { Faculty } from "../faculty/faculty.model";
import { AcademicDepertment } from "../academicDepertment/academicDepertment.model";
import { TFaculty } from "../faculty/faculty.interface";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
import { JwtPayload } from "jsonwebtoken";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a object
  const user: Partial<TUser> = {};
  user.password = password || (config.default_password as string);
  user.role = "student";
  user.email = payload?.email;
  const admisstionSemister = await AcademicSemister.findById(
    payload.academicSemister
  );
  if (!admisstionSemister) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }
  user.id = await genaretedId(admisstionSemister);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Create user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new AppError(404, "Failed to create user");
    }
    payload.id = newUser[0]?.id;
    payload.user = newUser[0]?._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(404, "Failed to create student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `${error}`);
  }
};
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";
  userData.email = payload?.email;
  // find academic department info
  const academicDepartment = await AcademicDepertment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  userData.email = payload?.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getMe = async (userId: string, role: string) => {
  //user exist
  const user = await User.isUserExistByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  //is user is deleted
  if (await User.isUserDeleted(userId)) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
  }
  //is user is blocked
  if (user.status === "block") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  let result = null;

  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  } else if (role === "faculty") {
    result = await Faculty.findOne({ id: userId }).populate("user");
  } else if (role === "student") {
    result = await Student.findOne({ id: userId }).populate("user");
  }
  return result;
};
export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
