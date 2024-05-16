import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseSevice } from "./course.service";

const createCourse = cathcAsync(async (req, res, next) => {
  const result = await courseSevice.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created succesfully",
    data: result,
  });
});

const getAllCourse = cathcAsync(async (req, res, next) => {

  const result = await courseSevice.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrive succesfully",
    data: result,
  });
});

const getSingleCourse = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseSevice.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved succesfully",
    data: result,
  });
});
const updateCourse = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseSevice.updateCourseIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is updated succesfully",
    data: result,
  });
});

const assignFaculties = cathcAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseSevice.assignFacultiesIntoDB(courseId, faculties);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Assign Faculties succesfully",
    data: result,
  });
});
const removeFaculties = cathcAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseSevice.removeFacultiesIntoDB(courseId, faculties);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Remove Faculties succesfully",
    data: result,
  });
});
const deleteCourse = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseSevice.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is deleted succesfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourse,
  updateCourse,
  getSingleCourse,
  deleteCourse,
  assignFaculties,
  removeFaculties,
};
