"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const faculty_validation_1 = require("../faculty/faculty.validation");
const admin_validation_1 = require("../admin/admin.validation");
const authenticateToken_1 = __importDefault(require("../../middleware/authenticateToken"));
const user_constant_1 = require("./user.constant");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-student", (0, authenticateToken_1.default)(user_constant_1.USER_ROLE.admin), 
//   validateRequest(createStudentValidationSchema),
user_controller_1.userController.createStudent);
router.post("/create-faculty", (0, authenticateToken_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(faculty_validation_1.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.createAdminValidationSchema), user_controller_1.userController.createAdmin);
router.post("/change-status/:id", (0, authenticateToken_1.default)("admin"), (0, validateRequest_1.default)(user_validation_1.userValidation.changeStatusValidationSchema), user_controller_1.userController.changeStatus);
router.get("/getMe", (0, authenticateToken_1.default)("admin"), user_controller_1.userController.getMe);
exports.userRoutes = router;
