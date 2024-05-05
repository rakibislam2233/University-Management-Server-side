import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemister } from "../academicSemister/academicSemister.model";
import { TSemisterRegistation } from "./semisterRegistation.interface";
import { SemisterRegistation } from "./semisterRegistation.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistationStatus } from "./semisterRegistation.constant";

const createSemisterRegistationIntoDB = async (
  payload: TSemisterRegistation
) => {
  const academicSemister = payload?.academicSemister;

  //Step:0 check if already registered Upcomign or ongonging semister

  const isThereUpcomningAnOngoingSemister = await SemisterRegistation.findOne({
    $or: [
      { status: RegistationStatus.UPCOMING },
      { status: RegistationStatus.ONGOING },
    ],
  });
  if (isThereUpcomningAnOngoingSemister) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereUpcomningAnOngoingSemister.status} registerd semister`
    );
  }
  //Step:1 check the academicSemister have a Database
  const isAcademicSemisterExists = await AcademicSemister.findById(
    academicSemister
  );
  if (!isAcademicSemisterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This academic semister not found"
    );
  }

  //Step:2 check the SemisterRegistation already exists
  const isSemisterRegistationExist = await SemisterRegistation.findOne({
    academicSemister,
  });
  if (isSemisterRegistationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This Semister is already registered"
    );
  }

  const result = await SemisterRegistation.create(payload);
  return result;
};

const getAllSemisterRegistationFromDB = async (
  query: Record<string, unknown>
) => {
  const semisterRegistationQuery = new QueryBuilder(
    SemisterRegistation.find().populate("academicSemister"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semisterRegistationQuery.modelQuery;
  return result;
};

const getSingleSemisterRegistationFromDB = async (id: string) => {
  const result = await SemisterRegistation.findById(id);
  return result;
};

const updateSemisterRegistationIntoDB = async (
  id: string,
  payload: Partial<TSemisterRegistation>
) => {
  const requestStatus = payload?.status;

  const isAcademicSemisterExists = await SemisterRegistation.findById(id);
  if (!isAcademicSemisterExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "This  semister not found");
  }
  const currentStatus = isAcademicSemisterExists?.status;
  //SEMISTER ENDED HOLE KONO KICU UPDATE KORBO NA
  if (currentStatus === RegistationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semister is already ${currentStatus}`
    );
  }

  //STATUS 'UPCOMING' THEKE DIRECT 'ENDED' KORA JABE NA
  if (
    currentStatus === RegistationStatus.UPCOMING &&
    requestStatus === RegistationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Your cannto direct status change ${currentStatus}  to ${requestStatus} `
    );
  }
  if (
    currentStatus === RegistationStatus.ONGOING &&
    requestStatus === RegistationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Your cannto direct status change ${currentStatus}  to ${requestStatus} `
    );
  }

  const result = await SemisterRegistation.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const SemisterRegistationService = {
  createSemisterRegistationIntoDB,
  getAllSemisterRegistationFromDB,
  getSingleSemisterRegistationFromDB,
  updateSemisterRegistationIntoDB,
};
