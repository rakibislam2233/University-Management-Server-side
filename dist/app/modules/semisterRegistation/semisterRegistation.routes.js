"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemisterRegistationRoutes = void 0;
const express_1 = require("express");
const semisterRegistation_controller_1 = require("./semisterRegistation.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const semisterRegistation_validation_1 = require("./semisterRegistation.validation");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(semisterRegistation_validation_1.SemisterRegistationValidation.createSemisterRegistationValidationSchema), semisterRegistation_controller_1.SemisterRegistationController.createSemisterRegistation);
router.get("/", semisterRegistation_controller_1.SemisterRegistationController.getAllSemisterRegistation);
router.get("/:id", semisterRegistation_controller_1.SemisterRegistationController.getSingleSemisterRegistation);
router.patch('/:id', semisterRegistation_controller_1.SemisterRegistationController.updateSemisterRegistation);
exports.SemisterRegistationRoutes = router;
