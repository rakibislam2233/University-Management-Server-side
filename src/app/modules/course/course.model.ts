import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculty,
  TPrerequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPrerequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//create model
export const Course = model<TCourse>("Course", courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    required: [true, "Course id is required"],
    ref: "Course",
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  "CourseFaculty",
  courseFacultiesSchema
);
