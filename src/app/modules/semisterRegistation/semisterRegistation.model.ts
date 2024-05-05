import { Schema, model } from "mongoose";
import { SemisterRegistationStatus } from "./semisterRegistation.constant";
import { TSemisterRegistation } from "./semisterRegistation.interface";

const semisterRegistationSchema = new Schema<TSemisterRegistation>({
  academicSemister: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemister",
    unique: true,
    required: [true, "Academic semister is required"],
  },
  status: {
    type: String,
    enum: SemisterRegistationStatus,
    default: "UPCOMING",
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  minCredit: {
    type: Number,
    default: 3,
  },
  maxCredit: {
    type: Number,
    default: 15,
  },
});

export const SemisterRegistation = model<TSemisterRegistation>(
  "SemisterRegistation",
  semisterRegistationSchema
);
