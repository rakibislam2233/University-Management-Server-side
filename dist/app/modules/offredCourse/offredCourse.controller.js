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
exports.offredCourseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const offredCourse_service_1 = require("./offredCourse.service");
const createOffredCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offredCourse_service_1.offredCourseSevice.createOffredCourseIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Offred Course created successfully",
        data: result,
    });
}));
const getAllOffredCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offredCourse_service_1.offredCourseSevice.getAllOffredCourseFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Offred Course retrive successfully",
        data: result,
    });
}));
const getSingleOffredCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield offredCourse_service_1.offredCourseSevice.getSingleOffredCourse(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Offred Course retrive successfully",
        data: result,
    });
}));
const updateOffredCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    //   const result = await offredCourseSevice.updateOffredCourseIntoDB(
    //     id,
    //     req.body
    //   );
    //   sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "update offred course successfully",
    //     data: result,
    //   });
}));
const deleteOffredCourse = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    //   const result = await offredCourseSevice.deleteOffredCourseIntoDB(id);
    //   sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "Deleted offred course successfully",
    //     data: result,
    //   });
}));
exports.offredCourseController = {
    createOffredCourse,
    getAllOffredCourse,
    getSingleOffredCourse,
    updateOffredCourse,
    deleteOffredCourse,
};
