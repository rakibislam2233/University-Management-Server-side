import { studentService } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
const getAllStudent = cathcAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student was retrive successfully",
    data: result,
  });
});
const getSingleStudent = cathcAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudentFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single Student was retrive successfully",
    data: result,
  });
});

const updateStudent = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentService.updateStudentIntoDB(id, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student was successfully updated",
    data: result,
  });
});
const deleteStudent = cathcAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await studentService.deleteStudentFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student was deleted successfully",
    data: result,
  });
});
export const studentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
