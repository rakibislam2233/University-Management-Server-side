import { Date } from "mongoose";
export type TAcademicSemisterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type TAcademicSemisterName = "Autumn" | "Summar" | "Fall";
export type TAcademicSemisterCode = "01" | "02" | "03";
export type TAcademicSemister = {
  name: TAcademicSemisterName;
  code: TAcademicSemisterCode;
  year: String;
  startMonth: TAcademicSemisterMonth;
  endMonth: TAcademicSemisterMonth;
};
export type TAcademicSemisterMapper = {
    [key: string]: string;
  };