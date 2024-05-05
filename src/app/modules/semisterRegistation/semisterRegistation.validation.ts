import { z } from "zod";

const createSemisterRegistationValidationSchema = z.object({
  body: z.object({
    academicSemister: z.string().min(1),
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).default("UPCOMING"),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().default(3),
    maxCredit: z.number().default(15),
  }),
});
const updateSemisterRegistationValidationSchema = z.object({
  body: z.object({
    academicSemister: z.string().min(1).optional(),
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]).default("UPCOMING"),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().default(3).optional(),
    maxCredit: z.number().default(15).optional(),
  }),
});

export const SemisterRegistationValidation = {
  createSemisterRegistationValidationSchema,
  updateSemisterRegistationValidationSchema,
};
