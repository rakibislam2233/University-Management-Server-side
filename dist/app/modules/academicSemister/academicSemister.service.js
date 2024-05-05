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
exports.academicSemisterService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemister_constant_1 = require("./academicSemister.constant");
const academicSemister_model_1 = require("./academicSemister.model");
const createAcademicSemisterIntoDB = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemister_constant_1.academicSemisterMapper[paylod.name] !== paylod.code) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Invalid academic code! example: 'Autumn' : '01' , 'Summar' : '02', 'Fall' : '03'`);
    }
    const result = yield academicSemister_model_1.AcademicSemister.create(paylod);
    return result;
});
const getAllAcademicSemisterFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemister_model_1.AcademicSemister.find();
    return result;
});
const getSingleAcademicSemisterFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemister_model_1.AcademicSemister.findById(id);
    return result;
});
const updateAcademicSemisterIntoDB = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemister_constant_1.academicSemisterMapper[paylod.name] !== paylod.code) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Invalid academic code! example: 'Autumn' : '01' , 'Summar' : '02', 'Fall' : '03'`);
    }
    const result = yield academicSemister_model_1.AcademicSemister.findByIdAndUpdate({ _id: id }, paylod, {
        new: true,
    });
    return result;
});
exports.academicSemisterService = {
    createAcademicSemisterIntoDB,
    getAllAcademicSemisterFromDB,
    getSingleAcademicSemisterFromDB,
    updateAcademicSemisterIntoDB,
};
