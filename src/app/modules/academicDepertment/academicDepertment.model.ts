import { Schema, model } from "mongoose";
import { TAcademicDepertment } from "./academicDepertment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepertmentSchema = new Schema<TAcademicDepertment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

academicDepertmentSchema.pre("save", async function (next) {
  const isDepertmentExist = await AcademicDepertment.findOne({
    name: this.name,
  });
  if (isDepertmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Depertment already exists");
  }
});

export const AcademicDepertment = model<TAcademicDepertment>(
  "AcademicDepertment",
  academicDepertmentSchema
);
