import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import authenticateToken from "../../middleware/authenticateToken";
import { USER_ROLE } from "./user.constant";
import { userValidation } from "./user.validation";

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
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);

router.post(
  "/change-status/:id",
  authenticateToken("admin"),
  validateRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus
);
router.get("/getMe", authenticateToken("admin"), userController.getMe);
export const userRoutes = router;
