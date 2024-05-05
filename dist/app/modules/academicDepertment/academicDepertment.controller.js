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
exports.academicDepertmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const academicDepertment_service_1 = require("./academicDepertment.service");
const academicDepertment_model_1 = require("./academicDepertment.model");
const createAcademicDepertment = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepertment_service_1.academicDepertmentSevice.createAcademicDepertmentIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Academic Depertment successfully created",
        data: result,
    });
}));
const getAllAcademicDepertment = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepertment_service_1.academicDepertmentSevice.getAllAcademicDepertmentFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All academic Depertment retrieved successfully",
        data: result,
    });
}));
const getSingleAcademicDepertment = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield academicDepertment_service_1.academicDepertmentSevice.getSingleAcademicDepertmentIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single academic Depertment retrieved successfully",
        data: result,
    });
}));
const updateSingleAcademicDepertment = (0, catchAsync_1.cathcAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isDepertmentExist = yield academicDepertment_model_1.AcademicDepertment.findById(id);
    if (!isDepertmentExist) {
        throw new Error("Academic Depertment not exist");
    }
    const result = yield academicDepertment_service_1.academicDepertmentSevice.updateAcademicDepertmentIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Academic Depertment update successfully",
        data: result,
    });
}));
exports.academicDepertmentController = {
    createAcademicDepertment,
    getAllAcademicDepertment,
    getSingleAcademicDepertment,
    updateSingleAcademicDepertment,
};
