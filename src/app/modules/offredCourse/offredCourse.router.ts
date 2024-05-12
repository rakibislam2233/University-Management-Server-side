import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseControllers } from "./offredCourse.controller";
import { OfferedCourseValidations } from "./offredCourse.validation";

const router = express.Router();

router.get("/", OfferedCourseControllers.getAllOfferedCourses);

router.get("/:id", OfferedCourseControllers.getSingleOfferedCourses);

router.post(
  "/",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

router.delete("/:id", OfferedCourseControllers.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
