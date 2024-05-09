import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { offredCourseValidation } from "./offredCourse.validation";
import { offredCourseController } from "./offredCourse.controller";

const router = Router();
router.post(
  "/",
  validateRequest(offredCourseValidation.createOffredCourseValidationSchame),
  offredCourseController.createOffredCourse
);

router.get("/", offredCourseController.getAllOffredCourse);

router.get("/:id", offredCourseController.getSingleOffredCourse);

export const offredCourseRouter = router;
