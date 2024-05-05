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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("./student.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constaint_1 = require("./student.constaint");
const getAllStudentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(student_model_1.default.find()
        .populate("academicSemister")
        .populate({
        path: "academicDepertment",
        populate: {
            path: "academicFaculty",
        },
    }), query)
        .search(student_constaint_1.studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
const getSingleStudentFromDB = (id) => {
    const result = student_model_1.default.findOne({ id: id });
    return result;
};
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, localGrudian, gurdian } = payload, remainingStudentData = __rest(payload, ["name", "localGrudian", "gurdian"]);
    const modifiedStudent = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [keys, value] of Object.entries(name)) {
            modifiedStudent[`name.${keys}`] = value;
        }
    }
    if (gurdian && Object.keys(gurdian).length) {
        for (const [keys, value] of Object.entries(gurdian)) {
            modifiedStudent[`gurdian.${keys}`] = value;
        }
    }
    if (localGrudian && Object.keys(localGrudian).length) {
        for (const [keys, value] of Object.entries(localGrudian)) {
            modifiedStudent[`localGrudian.${keys}`] = value;
        }
    }
    const result = yield student_model_1.default.findOneAndUpdate({ id }, modifiedStudent, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isUserExist = yield user_model_1.User.findOne({ id });
        if (!isUserExist) {
            throw new AppError_1.default(400, "User not exist in database");
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(400, "User not deleted");
        }
        const isStudentExist = yield user_model_1.User.findOne({ id });
        if (!isStudentExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Student not exist in database");
        }
        const deletedStudent = yield student_model_1.default.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Student not deleted");
        }
        yield session.commitTransaction();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(400, `${error}`);
    }
    finally {
        yield session.endSession();
    }
});
exports.studentService = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB,
};
