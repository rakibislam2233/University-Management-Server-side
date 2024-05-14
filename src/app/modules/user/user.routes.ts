import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import authenticateToken from "../../middleware/authenticateToken";
import { USER_ROLE } from "./user.constant";

const router = express.Router();
router.post(
  "/create-student",
  authenticateToken(USER_ROLE.admin),
  //   validateRequest(createStudentValidationSchema),
  userController.createStudent
);

router.post(
  "/create-faculty",
  authenticateToken(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  authenticateToken(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);
export const userRoutes = router;
