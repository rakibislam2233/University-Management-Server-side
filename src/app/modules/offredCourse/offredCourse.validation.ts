import * as z from "zod";
import { Days } from "./offredCourse.constant";

const createOffredCourseValidationSchame = z.object({
  body: z.object({
    seminsterRegistation: z.string(),
    academicFaculty: z.string(),
    academicDepertment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
    section: z.number().min(1, "Section must be at least 1"),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string(),
    endTime: z.string(),
  }),
});
const updateOffredCourseValidationSchame = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z
      .number()
      .min(1, "Max capacity must be at least 1")
      .optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offredCourseValidation = {
  createOffredCourseValidationSchame,
  updateOffredCourseValidationSchame,
};
