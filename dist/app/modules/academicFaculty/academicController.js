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
exports.academicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicFaculty_service_1 = require("./academicFaculty.service");
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAcademicFaculty = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultySevice.createAcademicFacultyIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Academic Faculty successfully created",
        data: result,
    });
}));
const getAllAcademicFaculty = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultySevice.getAllAcademicFacultyFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All academic faculty retrieved successfully",
        data: result,
    });
}));
const getSingleAcademicFaculty = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicFaculty_service_1.academicFacultySevice.getSingleAcademicFacultyIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single academic Faculty retrieved successfully",
        data: result,
    });
}));
const updateSingleAcademicFaculty = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isFacultyExist = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    if (!isFacultyExist) {
        throw new Error("Academic faculty not exist");
    }
    const result = yield academicFaculty_service_1.academicFacultySevice.updateAcademicFacultyIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic faculty update successfully",
        data: result,
    });
}));
exports.academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty,
};
