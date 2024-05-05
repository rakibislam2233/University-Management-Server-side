import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepertmentSevice } from "./academicDepertment.service";
import { AcademicDepertment } from "./academicDepertment.model";
const createAcademicDepertment = cathcAsync(async (req, res, next) => {
  const result = await academicDepertmentSevice.createAcademicDepertmentIntoDB(
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Depertment successfully created",
    data: result,
  });
});

const getAllAcademicDepertment = cathcAsync(async (req, res) => {
  const result =
    await academicDepertmentSevice.getAllAcademicDepertmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All academic Depertment retrieved successfully",
    data: result,
  });
});
const getSingleAcademicDepertment = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await academicDepertmentSevice.getSingleAcademicDepertmentIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single academic Depertment retrieved successfully",
    data: result,
  });
});
const updateSingleAcademicDepertment = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const isDepertmentExist = await AcademicDepertment.findById(id);
  if (!isDepertmentExist) {
    throw new Error("Academic Depertment not exist");
  }
  const result = await academicDepertmentSevice.updateAcademicDepertmentIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Depertment update successfully",
    data: result,
  });
});

export const academicDepertmentController = {
  createAcademicDepertment,
  getAllAcademicDepertment,
  getSingleAcademicDepertment,
  updateSingleAcademicDepertment,
};
