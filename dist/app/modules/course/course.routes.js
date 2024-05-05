"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const course_validation_1 = require("./course.validation");
const router = express_1.default.Router();
router.post("/create-course", (0, validateRequest_1.default)(course_validation_1.courseValidation.createCourseValidationSchema), course_controller_1.courseControllers.createCourse);
router.get("/", course_controller_1.courseControllers.getAllCourse);
router.get("/:id", course_controller_1.courseControllers.getSingleCourse);
router.put("/:courseId/assign-faculties", course_controller_1.courseControllers.assignFaculties);
router.delete("/:courseId/remove-faculties", course_controller_1.courseControllers.removeFaculties);
router.patch("/:id", (0, validateRequest_1.default)(course_validation_1.courseValidation.updateCourseValidationSchema), course_controller_1.courseControllers.updateCourse);
router.delete("/:id", course_controller_1.courseControllers.deleteCourse);
exports.courseRoutes = router;
