"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemisterRegistation = void 0;
const mongoose_1 = require("mongoose");
const semisterRegistation_constant_1 = require("./semisterRegistation.constant");
const semisterRegistationSchema = new mongoose_1.Schema({
    academicSemister: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AcademicSemister",
        unique: true,
        required: [true, "Academic semister is required"],
    },
    status: {
        type: String,
        enum: semisterRegistation_constant_1.SemisterRegistationStatus,
        default: "UPCOMING",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"],
    },
    minCredit: {
        type: Number,
        default: 3,
    },
    maxCredit: {
        type: Number,
        default: 15,
    },
});
exports.SemisterRegistation = (0, mongoose_1.model)("SemisterRegistation", semisterRegistationSchema);
