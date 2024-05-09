"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offredCourseRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const offredCourse_validation_1 = require("./offredCourse.validation");
const offredCourse_controller_1 = require("./offredCourse.controller");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(offredCourse_validation_1.offredCourseValidation.createOffredCourseValidationSchame), offredCourse_controller_1.offredCourseController.createOffredCourse);
router.get("/", offredCourse_controller_1.offredCourseController.getAllOffredCourse);
router.get("/:id", offredCourse_controller_1.offredCourseController.getSingleOffredCourse);
exports.offredCourseRouter = router;
