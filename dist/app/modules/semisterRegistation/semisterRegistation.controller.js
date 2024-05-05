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
exports.SemisterRegistationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const semisterRegistation_service_1 = require("./semisterRegistation.service");
const createSemisterRegistation = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semisterRegistation_service_1.SemisterRegistationService.createSemisterRegistationIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Semister registration created successfully",
        data: result,
    });
}));
const getAllSemisterRegistation = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semisterRegistation_service_1.SemisterRegistationService.getAllSemisterRegistationFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Semister Registation successfull",
        data: result,
    });
}));
const getSingleSemisterRegistation = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semisterRegistation_service_1.SemisterRegistationService.getSingleSemisterRegistationFromDB(id);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single semister registation retrive successfull",
        data: result,
    });
}));
const updateSemisterRegistation = (0, catchAsync_1.cathcAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semisterRegistation_service_1.SemisterRegistationService.updateSemisterRegistationIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Semister Registation update successfully",
        data: result,
    });
}));
exports.SemisterRegistationController = {
    createSemisterRegistation,
    getAllSemisterRegistation,
    getSingleSemisterRegistation,
    updateSemisterRegistation
};
