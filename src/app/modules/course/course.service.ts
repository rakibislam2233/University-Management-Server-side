import { Application } from "express";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constaint";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //basic course info update
    const basicCourseUpdate = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!basicCourseUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to update course ");
    }
    //deleteprerequisite courses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPrerequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPrerequisitesCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPrerequisites },
            },
          },
        },
        { new: true, runValidators: true, session }
      );
      if (!deletedPrerequisitesCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
      //addprerequisites courses
      const addPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );
      const addPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: addPreRequisite },
          },
        },
        { new: true, runValidators: true, session }
      );
      if (!addPreRequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const assignFacultiesIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};
const removeFacultiesIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const courseSevice = {
  createCourseIntoDB,
  getAllCourseFromDB,
  assignFacultiesIntoDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  removeFacultiesIntoDB,
};
