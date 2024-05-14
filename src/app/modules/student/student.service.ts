import mongoose from "mongoose";
import Student from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constaint";
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("user")
      .populate("academicSemister")
      .populate({
        path: "academicDepertment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentFromDB = (id: string) => {
  const result = Student.findOne({ id: id });
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, localGrudian, gurdian, ...remainingStudentData } = payload;
  const modifiedStudent: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedStudent[`name.${keys}`] = value;
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [keys, value] of Object.entries(gurdian)) {
      modifiedStudent[`gurdian.${keys}`] = value;
    }
  }

  if (localGrudian && Object.keys(localGrudian).length) {
    for (const [keys, value] of Object.entries(localGrudian)) {
      modifiedStudent[`localGrudian.${keys}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedStudent, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isUserExist = await User.findOne({ id });
    if (!isUserExist) {
      throw new AppError(400, "User not exist in database");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(400, "User not deleted");
    }
    const isStudentExist = await User.findOne({ id });
    if (!isStudentExist) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Student not exist in database"
      );
    }
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Student not deleted");
    }

    await session.commitTransaction();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(400, `${error}`);
  } finally {
    await session.endSession();
  }
};
export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
