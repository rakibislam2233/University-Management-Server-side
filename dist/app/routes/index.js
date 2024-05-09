"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_routes_1 = require("../modules/student/student.routes");
const user_routes_1 = require("../modules/user/user.routes");
const academicSemister_routes_1 = require("../modules/academicSemister/academicSemister.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepertment_routes_1 = require("../modules/academicDepertment/academicDepertment.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const course_routes_1 = require("../modules/course/course.routes");
const semisterRegistation_routes_1 = require("../modules/semisterRegistation/semisterRegistation.routes");
const offredCourse_router_1 = require("../modules/offredCourse/offredCourse.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/student",
        route: student_routes_1.studentRoutes,
    },
    {
        path: "/faculty",
        route: faculty_routes_1.FacultyRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.adminRoutes,
    },
    {
        path: "/academic-semister",
        route: academicSemister_routes_1.academicSemisterRoutes,
    },
    {
        path: "/academic-faculty",
        route: academicFaculty_routes_1.academicFacultyRoutes,
    },
    {
        path: "/academic-depertment",
        route: academicDepertment_routes_1.academicDepertmentRoutes,
    },
    {
        path: "/course",
        route: course_routes_1.courseRoutes,
    },
    {
        path: "/semister-registration",
        route: semisterRegistation_routes_1.SemisterRegistationRoutes,
    },
    {
        path: "/offred-course",
        route: offredCourse_router_1.offredCourseRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
