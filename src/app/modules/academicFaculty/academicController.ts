import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultySevice } from "./academicFaculty.service";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFaculty = cathcAsync(async (req, res, next) => {
  const result = await academicFacultySevice.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculty successfully created",
    data: result,
  });
});

const getAllAcademicFaculty = cathcAsync(async (req, res) => {
  const result = await academicFacultySevice.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All academic faculty retrieved successfully",
    data: result,
  });
});
const getSingleAcademicFaculty = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicFacultySevice.getSingleAcademicFacultyIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single academic Faculty retrieved successfully",
    data: result,
  });
});
const updateSingleAcademicFaculty = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const isFacultyExist = await AcademicFaculty.findById(id);
  if (!isFacultyExist) {
    throw new Error("Academic faculty not exist");
  }
  const result = await academicFacultySevice.updateAcademicFacultyIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty update successfully",
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
