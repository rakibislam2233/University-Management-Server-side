import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { SemisterRegistation } from "../semisterRegistation/semisterRegistation.model";
import { TOffredCourse } from "./offredCourse.interface";
import { OffredCourse } from "./offredCourse.model";
import { AcademicDepertment } from "../academicDepertment/academicDepertment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Faculty } from "../faculty/faculty.model";
import { Course } from "../course/course.model";

const createOffredCourseIntoDB = async (payload: TOffredCourse) => {
  const {
    seminsterRegistation,
    academicDepertment,
    academicFaculty,
    faculty,
    course,
  } = payload;

  //check semister register exist
  const isSemisterRegisterExist = await SemisterRegistation.findById(
    seminsterRegistation
  );
  const academicSemister = isSemisterRegisterExist?.academicSemister;
  if (!isSemisterRegisterExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Semister register not found");
  }

  //check academicDepertment exist
  const isAcademicDepertmentExist = await AcademicDepertment.findById(
    academicDepertment
  );
  if (!isAcademicDepertmentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic depertment not found");
  }

  //check academicFaculty exist
  const isAcademicFacultyExist = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic faculty not found");
  }

  //check faculty exist
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Faculty not found");
  }

  //check courses exist
  const isCoursesExist = await Course.findById(course);
  if (!isCoursesExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course not found");
  }

  const result = await OffredCourse.create({ ...payload, academicSemister });
  return result;
};

const getAllOffredCourseFromDB = async (query: Record<string, unknown>) => {
  const ofredCourseQuery = new QueryBuilder(OffredCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ofredCourseQuery.modelQuery;
  return result;
};

const getSingleOffredCourse = async (id: string) => {
  const result = await OffredCourse.findById(id);
  return result;
};

export const offredCourseSevice = {
  createOffredCourseIntoDB,
  getAllOffredCourseFromDB,
  getSingleOffredCourse,
};
