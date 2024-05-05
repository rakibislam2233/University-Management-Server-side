import express from "express";
import { adminControllers } from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.get("/", adminControllers.getAllAdmins);

router.get("/:id", adminControllers.getSingleAdmin);

router.patch(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateAdmin
);

router.delete("/:adminId", adminControllers.deleteAdmin);

export const adminRoutes = router;
