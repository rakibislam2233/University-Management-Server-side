import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offredCourseSevice } from "./offredCourse.service";

const createOffredCourse = cathcAsync(async (req, res, next) => {
  const result = await offredCourseSevice.createOffredCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offred Course created successfully",
    data: result,
  });
});

const getAllOffredCourse = cathcAsync(async (req, res, next) => {
  const result = await offredCourseSevice.getAllOffredCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Offred Course retrive successfully",
    data: result,
  });
});

const getSingleOffredCourse = cathcAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await offredCourseSevice.getSingleOffredCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Offred Course retrive successfully",
    data: result,
  });
});

const updateOffredCourse = cathcAsync(async (req, res, next) => {
  const id = req.params;
  //   const result = await offredCourseSevice.updateOffredCourseIntoDB(
  //     id,
  //     req.body
  //   );
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: "update offred course successfully",
  //     data: result,
  //   });
});

const deleteOffredCourse = cathcAsync(async (req, res, next) => {
  const id = req.params;
  //   const result = await offredCourseSevice.deleteOffredCourseIntoDB(id);
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: "Deleted offred course successfully",
  //     data: result,
  //   });
});
export const offredCourseController = {
  createOffredCourse,
  getAllOffredCourse,
  getSingleOffredCourse,
  updateOffredCourse,
  deleteOffredCourse,
};
