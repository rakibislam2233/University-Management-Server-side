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
exports.offredCourseSevice = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const semisterRegistation_model_1 = require("../semisterRegistation/semisterRegistation.model");
const offredCourse_model_1 = require("./offredCourse.model");
const academicDepertment_model_1 = require("../academicDepertment/academicDepertment.model");
const academicFaculty_model_1 = require("../academicFaculty/academicFaculty.model");
const faculty_model_1 = require("../faculty/faculty.model");
const course_model_1 = require("../course/course.model");
const createOffredCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { seminsterRegistation, academicDepertment, academicFaculty, faculty, course, } = payload;
    //check semister register exist
    const isSemisterRegisterExist = yield semisterRegistation_model_1.SemisterRegistation.findById(seminsterRegistation);
    const academicSemister = isSemisterRegisterExist === null || isSemisterRegisterExist === void 0 ? void 0 : isSemisterRegisterExist.academicSemister;
    if (!isSemisterRegisterExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Semister register not found");
    }
    //check academicDepertment exist
    const isAcademicDepertmentExist = yield academicDepertment_model_1.AcademicDepertment.findById(academicDepertment);
    if (!isAcademicDepertmentExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Academic depertment not found");
    }
    //check academicFaculty exist
    const isAcademicFacultyExist = yield academicFaculty_model_1.AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Academic faculty not found");
    }
    //check faculty exist
    const isFacultyExist = yield faculty_model_1.Faculty.findById(faculty);
    if (!isFacultyExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Faculty not found");
    }
    //check courses exist
    const isCoursesExist = yield course_model_1.Course.findById(course);
    if (!isCoursesExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Course not found");
    }
    const result = yield offredCourse_model_1.OffredCourse.create(Object.assign(Object.assign({}, payload), { academicSemister }));
    return result;
});
const getAllOffredCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const ofredCourseQuery = new QueryBuilder_1.default(offredCourse_model_1.OffredCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield ofredCourseQuery.modelQuery;
    return result;
});
const getSingleOffredCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offredCourse_model_1.OffredCourse.findById(id);
    return result;
});
exports.offredCourseSevice = {
    createOffredCourseIntoDB,
    getAllOffredCourseFromDB,
    getSingleOffredCourse,
};
