"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = express_1.default.Router();
router.get("/", admin_controller_1.adminControllers.getAllAdmins);
router.get("/:id", admin_controller_1.adminControllers.getSingleAdmin);
router.patch("/:id", (0, validateRequest_1.default)(admin_validation_1.updateAdminValidationSchema), admin_controller_1.adminControllers.updateAdmin);
router.delete("/:adminId", admin_controller_1.adminControllers.deleteAdmin);
exports.adminRoutes = router;
