import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { cathcAsync } from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return cathcAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
