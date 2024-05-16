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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemister_model_1 = require("../academicSemister/academicSemister.model");
const student_model_1 = __importDefault(require("../student/student.model"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const faculty_model_1 = require("../faculty/faculty.model");
const academicDepertment_model_1 = require("../academicDepertment/academicDepertment.model");
const admin_model_1 = require("../admin/admin.model");
const createStudentIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //create a object
    const user = {};
    user.password = password || config_1.default.default_password;
    user.role = "student";
    user.email = payload === null || payload === void 0 ? void 0 : payload.email;
    const admisstionSemister = yield academicSemister_model_1.AcademicSemister.findById(payload.academicSemister);
    if (!admisstionSemister) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Admission semester not found");
    }
    user.id = yield (0, user_utils_1.genaretedId)(admisstionSemister);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create user
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new AppError_1.default(404, "Failed to create user");
        }
        payload.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
        payload.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
        const newStudent = yield student_model_1.default.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(404, "Failed to create student");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `${error}`);
    }
});
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = "faculty";
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    // find academic department info
    const academicDepartment = yield academicDepertment_model_1.AcademicDepertment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(400, "Academic department not found");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateFacultyId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create user");
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create faculty");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = "admin";
    userData.email = payload === null || payload === void 0 ? void 0 : payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, user_utils_1.generateAdminId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getMe = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    //user exist
    const user = yield user_model_1.User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    //is user is deleted
    if (yield user_model_1.User.isUserDeleted(userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is deleted");
    }
    //is user is blocked
    if (user.status === "block") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is blocked");
    }
    let result = null;
    if (role === "admin") {
        result = yield admin_model_1.Admin.findOne({ id: userId }).populate("user");
    }
    else if (role === "faculty") {
        result = yield faculty_model_1.Faculty.findOne({ id: userId }).populate("user");
    }
    else if (role === "student") {
        result = yield student_model_1.default.findOne({ id: userId }).populate("user");
    }
    return result;
});
exports.userService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus,
};
