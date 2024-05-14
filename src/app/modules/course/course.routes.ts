import express from "express";
import { courseControllers } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidation } from "./course.validation";
import authenticateToken from "../../middleware/authenticateToken";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(courseValidation.createCourseValidationSchema),
  courseControllers.createCourse
);

router.get(
  "/",
  authenticateToken("admin", "faculty", "student"),
  courseControllers.getAllCourse
);
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
