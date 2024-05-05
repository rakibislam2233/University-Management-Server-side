"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const getAllStudent = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.studentService.getAllStudentFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Student was retrive successfully",
        data: result,
    });
}));
const getSingleStudent = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_service_1.studentService.getSingleStudentFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Single Student was retrive successfully",
        data: result,
    });
}));
const updateStudent = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { student } = req.body;
    const result = yield student_service_1.studentService.updateStudentIntoDB(id, student);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Student was successfully updated",
        data: result,
    });
}));
const deleteStudent = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield student_service_1.studentService.deleteStudentFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Student was deleted successfully",
        data: result,
    });
}));
exports.studentController = {
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
