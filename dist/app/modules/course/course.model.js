"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFaculty = exports.Course = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCoursesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
        trim: true,
    },
    credits: {
        type: Number,
        required: true,
        trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
//create model
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
const courseFacultiesSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Course id is required"],
        ref: "Course",
        unique: true,
    },
    faculties: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Faculty",
        },
    ],
});
exports.CourseFaculty = (0, mongoose_1.model)("CourseFaculty", courseFacultiesSchema);
