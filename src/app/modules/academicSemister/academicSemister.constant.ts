import {
  TAcademicSemisterCode,
  TAcademicSemisterName,
  TAcademicSemisterMonth,
  TAcademicSemisterMapper,
} from "./academicSemister.interface";

export const AcademicSemisterMonth: TAcademicSemisterMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemisterName: TAcademicSemisterName[] = [
  "Autumn",
  "Summar",
  "Fall",
];

export const AcademicSemisterCode: TAcademicSemisterCode[] = ["01", "02", "03"];
export const academicSemisterMapper: TAcademicSemisterMapper = {
    Autumn: "01",
    Summar: "02",
    Fall: "03",
  };
