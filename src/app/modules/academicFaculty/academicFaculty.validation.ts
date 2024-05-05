import { z } from "zod";

const createAcademicFacultSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

const updateAcademicFacultSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultSchema,
  updateAcademicFacultSchema,
};
