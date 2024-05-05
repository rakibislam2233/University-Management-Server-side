import { Router } from "express";
import { SemisterRegistationController } from "./semisterRegistation.controller";
import validateRequest from "../../middleware/validateRequest";
import { SemisterRegistationValidation } from "./semisterRegistation.validation";

const router = Router();

router.post(
  "/",
  validateRequest(
    SemisterRegistationValidation.createSemisterRegistationValidationSchema
  ),
  SemisterRegistationController.createSemisterRegistation
);

router.get("/", SemisterRegistationController.getAllSemisterRegistation);
router.get("/:id", SemisterRegistationController.getSingleSemisterRegistation);

router.patch('/:id', SemisterRegistationController.updateSemisterRegistation);
export const SemisterRegistationRoutes = router;
