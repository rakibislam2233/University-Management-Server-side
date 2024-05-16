import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { cathcAsync } from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createStudent = cathcAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await userService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created succesfully",
    data: result,
  });
});
const createFaculty = cathcAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});
const createAdmin = cathcAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

const changeStatus = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Status is changed succesfully",
    data: result,
  });
});

const getMe = cathcAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await userService.getMe(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single user is retrieved succesfully",
    data: result,
  });
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
