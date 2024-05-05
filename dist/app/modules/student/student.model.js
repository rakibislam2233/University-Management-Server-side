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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    middleName: { type: String },
    lastName: { type: String, required: true },
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherContactNumber: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    motherContactNumber: { type: String },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Id is required"],
        unique: true,
    },
    name: {
        type: nameSchema,
        required: [true, "Name is required"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Id is required"],
        unique: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUE} is not valid",
        },
        required: [true, "Gender is required"],
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    emergencyContactNumber: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
        type: String,
        required: true,
    },
    parmanentAddress: {
        type: String,
        required: true,
    },
    gurdian: guardianSchema,
    localGrudian: localGuardianSchema,
    academicSemister: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "AcademicSemister",
    },
    academicDepertment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "AcademicDepertment",
    },
    profileImage: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
//virtual
studentSchema.virtual("fullName").get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// Query middleware
studentSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } }).select("-password");
        next();
    });
});
studentSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } }).select("-password");
        next();
    });
});
studentSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } }).select("-password");
        next();
    });
});
//creating a static method;
studentSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = Student.findOne({ id });
        return existingUser;
    });
};
// Create and export the model
const Student = (0, mongoose_1.model)("Student", studentSchema);
exports.default = Student;
