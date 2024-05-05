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
exports.SemisterRegistationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemister_model_1 = require("../academicSemister/academicSemister.model");
const semisterRegistation_model_1 = require("./semisterRegistation.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const semisterRegistation_constant_1 = require("./semisterRegistation.constant");
const createSemisterRegistationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemister = payload === null || payload === void 0 ? void 0 : payload.academicSemister;
    //Step:0 check if already registered Upcomign or ongonging semister
    const isThereUpcomningAnOngoingSemister = yield semisterRegistation_model_1.SemisterRegistation.findOne({
        $or: [
            { status: semisterRegistation_constant_1.RegistationStatus.UPCOMING },
            { status: semisterRegistation_constant_1.RegistationStatus.ONGOING },
        ],
    });
    if (isThereUpcomningAnOngoingSemister) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `There is already an ${isThereUpcomningAnOngoingSemister.status} registerd semister`);
    }
    //Step:1 check the academicSemister have a Database
    const isAcademicSemisterExists = yield academicSemister_model_1.AcademicSemister.findById(academicSemister);
    if (!isAcademicSemisterExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This academic semister not found");
    }
    //Step:2 check the SemisterRegistation already exists
    const isSemisterRegistationExist = yield semisterRegistation_model_1.SemisterRegistation.findOne({
        academicSemister,
    });
    if (isSemisterRegistationExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This Semister is already registered");
    }
    const result = yield semisterRegistation_model_1.SemisterRegistation.create(payload);
    return result;
});
const getAllSemisterRegistationFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semisterRegistationQuery = new QueryBuilder_1.default(semisterRegistation_model_1.SemisterRegistation.find().populate("academicSemister"), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semisterRegistationQuery.modelQuery;
    return result;
});
const getSingleSemisterRegistationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semisterRegistation_model_1.SemisterRegistation.findById(id);
    return result;
});
const updateSemisterRegistationIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    const isAcademicSemisterExists = yield semisterRegistation_model_1.SemisterRegistation.findById(id);
    if (!isAcademicSemisterExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This  semister not found");
    }
    const currentStatus = isAcademicSemisterExists === null || isAcademicSemisterExists === void 0 ? void 0 : isAcademicSemisterExists.status;
    //SEMISTER ENDED HOLE KONO KICU UPDATE KORBO NA
    if (currentStatus === semisterRegistation_constant_1.RegistationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `This semister is already ${currentStatus}`);
    }
    //STATUS 'UPCOMING' THEKE DIRECT 'ENDED' KORA JABE NA
    if (currentStatus === semisterRegistation_constant_1.RegistationStatus.UPCOMING &&
        requestStatus === semisterRegistation_constant_1.RegistationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Your cannto direct status change ${currentStatus}  to ${requestStatus} `);
    }
    if (currentStatus === semisterRegistation_constant_1.RegistationStatus.ONGOING &&
        requestStatus === semisterRegistation_constant_1.RegistationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Your cannto direct status change ${currentStatus}  to ${requestStatus} `);
    }
    const result = yield semisterRegistation_model_1.SemisterRegistation.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.SemisterRegistationService = {
    createSemisterRegistationIntoDB,
    getAllSemisterRegistationFromDB,
    getSingleSemisterRegistationFromDB,
    updateSemisterRegistationIntoDB,
};
