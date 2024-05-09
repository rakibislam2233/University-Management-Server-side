import { Types } from "mongoose";

type Days = "Sat" | "Sun" | "Mon" | "Tue" | "wed" | "Thu" | "Fri";

export type TOffredCourse = {
  seminsterRegistation: Types.ObjectId;
  academicSemister: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepertment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: Days[];
  startTime: string;
  endTime: string;
};
