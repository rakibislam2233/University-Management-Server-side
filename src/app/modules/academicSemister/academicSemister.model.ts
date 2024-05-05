import { Schema, model } from "mongoose";
import { TAcademicSemister } from "./academicSemister.interface";
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  AcademicSemisterMonth,
} from "./academicSemister.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicSemisterSchema = new Schema<TAcademicSemister>({
  name: {
    type: String,
    enum: AcademicSemisterName,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicSemisterCode,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: AcademicSemisterMonth,
  },
  endMonth: {
    type: String,
    enum: AcademicSemisterMonth,
  },
});

//check already exists semister in database

academicSemisterSchema.pre("save", async function (next) {
  const isAcademicSemisterExists = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });
  if (isAcademicSemisterExists) {
    throw new AppError(httpStatus.NOT_FOUND,"Semister already exists");
  }
  next();
});

export const AcademicSemister = model<TAcademicSemister>(
  "AcademicSemister",
  academicSemisterSchema
);
