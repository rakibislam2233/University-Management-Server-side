import { Router } from "express";
import { academicSemisterController } from "./academicSemister.controller";
import validateRequest from "../../middleware/validateRequest";
import { academicSemisterValidation } from "./academicSemister.validation";

const router = Router();
router.post(
  "/",
  validateRequest(
    academicSemisterValidation.createAcademicSemisterValidationSchema
  ),
  academicSemisterController.createAcademicSemister
);
router.get("/", academicSemisterController.getAllAcademicSemister);
router.get("/:id", academicSemisterController.getSingleAcademicSemister);
router.patch(
  "/:id",
  validateRequest(
    academicSemisterValidation.updateAcademicSemisterValidationSchema
  ),
  academicSemisterController.updateSingleAcademicSemister
);

export const academicSemisterRoutes = router;
