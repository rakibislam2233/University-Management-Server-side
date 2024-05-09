"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffredCourse = void 0;
const mongoose_1 = require("mongoose");
const offredCourse_constant_1 = require("./offredCourse.constant");
const offredCourseSchema = new mongoose_1.Schema({
    seminsterRegistation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SemisterRegistation",
        required: [true, "Semister registation is required"],
    },
    academicSemister: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicSemister",
        required: [true, "Academic registation is required"],
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicFaculty",
        required: [true, "Academic registation is required"],
    },
    academicDepertment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicDepertment",
        required: [true, "Academic depertment is required"],
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course is required"],
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Faculty",
        required: [true, "Faculty is required"],
    },
    maxCapacity: {
        type: Number,
        required: [true, "Max capacity is required"],
    },
    section: {
        type: Number,
        required: [true, "Section is required"],
    },
    days: [
        {
            type: String,
            enum: offredCourse_constant_1.Days,
            required: [true, "Days is required"],
        },
    ],
    startTime: {
        type: String,
        required: [true, "Start time is required"],
    },
    endTime: {
        type: String,
        required: [true, "End time is required"],
    },
});
exports.OffredCourse = (0, mongoose_1.model)("OffredCourse", offredCourseSchema);
