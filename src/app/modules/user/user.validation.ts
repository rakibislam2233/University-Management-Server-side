import { z } from "zod";

const createUserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "Password can not be less than 20 characters" }),
});

export const userValidation = {
  createUserValidationSchema,
};
