import httpStatus from "http-status";
import { cathcAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemisterRegistationService } from "./semisterRegistation.service";

const createSemisterRegistation = cathcAsync(async (req, res, next) => {
  const result =
    await SemisterRegistationService.createSemisterRegistationIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister registration created successfully",
    data: result,
  });
});

const getAllSemisterRegistation = cathcAsync(async (req, res, next) => {
  const result =
    await SemisterRegistationService.getAllSemisterRegistationFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Semister Registation successfull",
    data: result,
  });
});

const getSingleSemisterRegistation = cathcAsync(async (req, res, next) => {
  const { id } = req.params;
  const result =
    await SemisterRegistationService.getSingleSemisterRegistationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single semister registation retrive successfull",
    data: result,
  });
});

const updateSemisterRegistation = cathcAsync(async (req, res, next) => {
  const { id } = req.params;
  const result =
    await SemisterRegistationService.updateSemisterRegistationIntoDB(
      id,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Registation update successfully",
    data: result,
  });
});
export const SemisterRegistationController = {
  createSemisterRegistation,
  getAllSemisterRegistation,
  getSingleSemisterRegistation,
  updateSemisterRegistation
};
