import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemisterService } from "./academicSemister.service";
import { AcademicSemister } from "./academicSemister.model";

const createAcademicSemister = cathcAsync(async (req, res, next) => {
  const result = await academicSemisterService.createAcademicSemisterIntoDB(
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semister successfully created",
    data: result,
  });
});

const getAllAcademicSemister = cathcAsync(async (req, res) => {
  const result = await academicSemisterService.getAllAcademicSemisterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All academic semister retrieved successfully",
    data: result,
  });
});
const getSingleAcademicSemister = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicSemisterService.getSingleAcademicSemisterFromDB(
    id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single academic semister retrieved successfully",
    data: result,
  });
});
const updateSingleAcademicSemister = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const isSemisterExist = await AcademicSemister.findById(id);
  if (!isSemisterExist) {
    throw new Error("Academic semister not exist");
  }
  const result = await academicSemisterService.updateAcademicSemisterIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semister update successfully",
    data: result,
  });
});
export const academicSemisterController = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateSingleAcademicSemister,
};
