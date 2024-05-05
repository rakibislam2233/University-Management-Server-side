"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemisterRoutes = void 0;
const express_1 = require("express");
const academicSemister_controller_1 = require("./academicSemister.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicSemister_validation_1 = require("./academicSemister.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(academicSemister_validation_1.academicSemisterValidation.createAcademicSemisterValidationSchema), academicSemister_controller_1.academicSemisterController.createAcademicSemister);
router.get("/", academicSemister_controller_1.academicSemisterController.getAllAcademicSemister);
router.get("/:id", academicSemister_controller_1.academicSemisterController.getSingleAcademicSemister);
router.patch("/:id", (0, validateRequest_1.default)(academicSemister_validation_1.academicSemisterValidation.updateAcademicSemisterValidationSchema), academicSemister_controller_1.academicSemisterController.updateSingleAcademicSemister);
exports.academicSemisterRoutes = router;
