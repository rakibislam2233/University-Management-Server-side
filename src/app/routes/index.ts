import { Router } from "express";
import { studentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.routes";
import { academicSemisterRoutes } from "../modules/academicSemister/academicSemister.routes";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepertmentRoutes } from "../modules/academicDepertment/academicDepertment.routes";
import { FacultyRoutes } from "../modules/faculty/faculty.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { SemisterRegistationRoutes } from "../modules/semisterRegistation/semisterRegistation.routes";
import { offredCourseRouter } from "../modules/offredCourse/offredCourse.router";

const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/student",
    route: studentRoutes,
  },
  {
    path: "/faculty",
    route: FacultyRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/academic-semister",
    route: academicSemisterRoutes,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-depertment",
    route: academicDepertmentRoutes,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/semister-registration",
    route: SemisterRegistationRoutes,
  },
  {
    path: "/offred-course",
    route: offredCourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
