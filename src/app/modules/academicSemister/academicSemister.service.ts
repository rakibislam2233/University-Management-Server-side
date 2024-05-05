import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { academicSemisterMapper } from "./academicSemister.constant";
import { TAcademicSemister } from "./academicSemister.interface";
import { AcademicSemister } from "./academicSemister.model";

const createAcademicSemisterIntoDB = async (paylod: TAcademicSemister) => {
  if (academicSemisterMapper[paylod.name] !== paylod.code) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Invalid academic code! example: 'Autumn' : '01' , 'Summar' : '02', 'Fall' : '03'`
    );
  }
  const result = await AcademicSemister.create(paylod);

  return result;
};

const getAllAcademicSemisterFromDB = async () => {
  const result = await AcademicSemister.find();
  return result;
};
const getSingleAcademicSemisterFromDB = async (id: string) => {
  const result = await AcademicSemister.findById(id);
  return result;
};
const updateAcademicSemisterIntoDB = async (
  id: string,
  paylod: Partial<TAcademicSemister>
) => {
  if (academicSemisterMapper[paylod.name as string] !== paylod.code) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Invalid academic code! example: 'Autumn' : '01' , 'Summar' : '02', 'Fall' : '03'`
    );
  }
  const result = await AcademicSemister.findByIdAndUpdate({ _id: id }, paylod, {
    new: true,
  });
  return result;
};

export const academicSemisterService = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemisterFromDB,
  getSingleAcademicSemisterFromDB,
  updateAcademicSemisterIntoDB,
};
