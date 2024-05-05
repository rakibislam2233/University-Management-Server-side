"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicController_1 = require("./academicController");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.createAcademicFacultSchema), academicController_1.academicFacultyController.createAcademicFaculty);
router.get("/", academicController_1.academicFacultyController.getAllAcademicFaculty);
router.get("/:id", academicController_1.academicFacultyController.getSingleAcademicFaculty);
router.patch("/:id", (0, validateRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.updateAcademicFacultSchema), academicController_1.academicFacultyController.updateSingleAcademicFaculty);
exports.academicFacultyRoutes = router;
