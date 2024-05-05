import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicController";

const router = Router();
router.post(
  "/",
  validateRequest(academicFacultyValidation.createAcademicFacultSchema),
  academicFacultyController.createAcademicFaculty
);
router.get("/", academicFacultyController.getAllAcademicFaculty);
router.get("/:id", academicFacultyController.getSingleAcademicFaculty);
router.patch(
  "/:id",
  validateRequest(academicFacultyValidation.updateAcademicFacultSchema),
  academicFacultyController.updateSingleAcademicFaculty
);

export const academicFacultyRoutes = router;
