import { TAcademicSemister } from "../academicSemister/academicSemister.interface";
import { User } from "./user.model";

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genaretedId = async (payload: TAcademicSemister) => {
  let currentId: string | undefined = (0).toString(); //by default 0000
  const lastStudentId = await findLastStudentId();
  const lastStudentSemisterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemisterCode = lastStudentId?.substring(4, 6);
  const currentStudentSemisterYear = payload.year;
  const currentStudentSemisterCode = payload.code;
  if (
    lastStudentSemisterYear === currentStudentSemisterYear &&
    lastStudentSemisterCode === currentStudentSemisterCode
  ) {
    currentId = lastStudentId?.substring(6);
  }
  let icrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  icrementId = `${payload.year}${payload.code}${icrementId}`;
  return icrementId;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: "faculty",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `A-${incrementId}`;
  return incrementId;
};
