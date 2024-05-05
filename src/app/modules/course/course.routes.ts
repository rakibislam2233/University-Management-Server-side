import express from "express";
import { courseControllers } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse
);

router.get("/", courseControllers.getAllCourse);
router.get("/:id", courseControllers.getSingleCourse);

router.put("/:courseId/assign-faculties", courseControllers.assignFaculties);
router.delete("/:courseId/remove-faculties", courseControllers.removeFaculties);

router.patch(
  "/:id",
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse
);

router.delete("/:id", courseControllers.deleteCourse);

export const courseRoutes = router;
