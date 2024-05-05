import { z } from "zod";
import {
  AcademicSemisterCode,
  AcademicSemisterMonth,
  AcademicSemisterName,
} from "./academicSemister.constant";

const createAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]),
    startMonth: z.enum([...AcademicSemisterMonth] as [string, ...string[]]),
    endMonth: z.enum([...AcademicSemisterMonth] as [string, ...string[]]),
  }),
});

const updateAcademicSemisterValidationSchema = z.object({
  body: z
    .object({
      name: z
        .enum([...AcademicSemisterName] as [string, ...string[]])
        .optional(),
      year: z.string().optional(),
      code: z
        .enum([...AcademicSemisterCode] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...AcademicSemisterMonth] as [string, ...string[]])
        .optional(),
      endMonth: z
        .enum([...AcademicSemisterMonth] as [string, ...string[]])
        .optional(),
    })
    .optional(),
});
export const academicSemisterValidation = {
  createAcademicSemisterValidationSchema,
  updateAcademicSemisterValidationSchema
};
