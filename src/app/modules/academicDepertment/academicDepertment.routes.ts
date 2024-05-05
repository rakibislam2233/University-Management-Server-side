import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { academicDepertmentValidation } from "./academicDepertment.validation";
import { academicDepertmentController } from "./academicDepertment.controller";
const router = Router();
router.post(
  "/",
  validateRequest(academicDepertmentValidation.createAcademicDepertmentSchema),
  academicDepertmentController.createAcademicDepertment
);
router.get("/", academicDepertmentController.getAllAcademicDepertment);
router.get("/:id", academicDepertmentController.getSingleAcademicDepertment);
router.patch(
  "/:id",
  validateRequest(academicDepertmentValidation.updateAcademicDepertmentSchema),
  academicDepertmentController.updateSingleAcademicDepertment
);

export const academicDepertmentRoutes = router;
