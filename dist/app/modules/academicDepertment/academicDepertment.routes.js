"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepertmentRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicDepertment_validation_1 = require("./academicDepertment.validation");
const academicDepertment_controller_1 = require("./academicDepertment.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(academicDepertment_validation_1.academicDepertmentValidation.createAcademicDepertmentSchema), academicDepertment_controller_1.academicDepertmentController.createAcademicDepertment);
router.get("/", academicDepertment_controller_1.academicDepertmentController.getAllAcademicDepertment);
router.get("/:id", academicDepertment_controller_1.academicDepertmentController.getSingleAcademicDepertment);
router.patch("/:id", (0, validateRequest_1.default)(academicDepertment_validation_1.academicDepertmentValidation.updateAcademicDepertmentSchema), academicDepertment_controller_1.academicDepertmentController.updateSingleAcademicDepertment);
exports.academicDepertmentRoutes = router;
