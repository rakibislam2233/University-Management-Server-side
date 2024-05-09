import { Schema, model } from "mongoose";
import { TOffredCourse } from "./offredCourse.interface";
import { Days } from "./offredCourse.constant";

const offredCourseSchema = new Schema<TOffredCourse>({
  seminsterRegistation: {
    type: Schema.Types.ObjectId,
    ref: "SemisterRegistation",
    required: [true, "Semister registation is required"],
  },
  academicSemister: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemister",
    required: [true, "Academic registation is required"],
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
    required: [true, "Academic registation is required"],
  },
  academicDepertment: {
    type: Schema.Types.ObjectId,
    ref: "AcademicDepertment",
    required: [true, "Academic depertment is required"],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course is required"],
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
    required: [true, "Faculty is required"],
  },
  maxCapacity: {
    type: Number,
    required: [true, "Max capacity is required"],
  },
  section: {
    type: Number,
    required: [true, "Section is required"],
  },
  days: [
    {
      type: String,
      enum: Days,
      required: [true, "Days is required"],
    },
  ],
  startTime: {
    type: String,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: String,
    required: [true, "End time is required"],
  },
});

export const OffredCourse = model<TOffredCourse>(
  "OffredCourse",
  offredCourseSchema
);
