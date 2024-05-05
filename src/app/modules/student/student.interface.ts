import { Date, Model, Types } from "mongoose";

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};
export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};
export type TStudent = {
  id: string;
  name: TStudentName;
  user: Types.ObjectId;
  gender: "male" | "female";
  dateOfBirth: String;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  parmanentAddress: string;
  gurdian: TGurdian;
  localGrudian: TLocalGurdian;
  academicSemister: Types.ObjectId;
  academicDepertment: Types.ObjectId;
  profileImage?: string;
  isDeleted: boolean;
};

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
