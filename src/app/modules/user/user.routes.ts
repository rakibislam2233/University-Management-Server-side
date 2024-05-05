import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";

const router = express.Router();
router.post(
  "/create-student",
  //   validateRequest(createStudentValidationSchema),
  userController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);
export const userRoutes = router;
