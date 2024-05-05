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
exports.courseControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_service_1 = require("./course.service");
const createCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseSevice.createCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course is created succesfully",
        data: result,
    });
}));
const getAllCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.courseSevice.getAllCourseFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course is retrive succesfully",
        data: result,
    });
}));
const getSingleCourse = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseSevice.getSingleCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course is retrieved succesfully",
        data: result,
    });
}));
const updateCourse = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseSevice.updateCourseIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Course is updated succesfully",
        data: result,
    });
}));
const assignFaculties = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.courseSevice.assignFacultiesIntoDB(courseId, faculties);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Assign Faculties succesfully",
        data: result,
    });
}));
const removeFaculties = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = yield course_service_1.courseSevice.removeFacultiesIntoDB(courseId, faculties);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Remove Faculties succesfully",
        data: result,
    });
}));
const deleteCourse = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_service_1.courseSevice.deleteCourseFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Course is deleted succesfully",
        data: result,
    });
}));
exports.courseControllers = {
    createCourse,
    getAllCourse,
    updateCourse,
    getSingleCourse,
    deleteCourse,
    assignFaculties,
    removeFaculties,
};
