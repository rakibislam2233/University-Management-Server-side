"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const offredCourse_controller_1 = require("./offredCourse.controller");
const offredCourse_validation_1 = require("./offredCourse.validation");
const router = express_1.default.Router();
router.get("/", offredCourse_controller_1.OfferedCourseControllers.getAllOfferedCourses);
router.get("/:id", offredCourse_controller_1.OfferedCourseControllers.getSingleOfferedCourses);
router.post("/", (0, validateRequest_1.default)(offredCourse_validation_1.OfferedCourseValidations.createOfferedCourseValidationSchema), offredCourse_controller_1.OfferedCourseControllers.createOfferedCourse);
router.patch("/:id", (0, validateRequest_1.default)(offredCourse_validation_1.OfferedCourseValidations.updateOfferedCourseValidationSchema), offredCourse_controller_1.OfferedCourseControllers.updateOfferedCourse);
router.delete("/:id", offredCourse_controller_1.OfferedCourseControllers.deleteOfferedCourseFromDB);
exports.offeredCourseRoutes = router;
