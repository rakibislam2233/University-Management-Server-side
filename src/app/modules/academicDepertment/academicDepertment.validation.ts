import { z } from "zod";

const createAcademicDepertmentSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic facult must be a string",
      required_error: "Academic faculty is required",
    }),
  }),
});

const updateAcademicDepertmentSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic facult must be a string",
        required_error: "Academic faculty is required",
      })
      .optional(),
  }),
});

export const academicDepertmentValidation = {
  createAcademicDepertmentSchema,
  updateAcademicDepertmentSchema,
};
