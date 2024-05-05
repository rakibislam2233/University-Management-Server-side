import { Schema, model } from "mongoose";
import {
  StudentModel,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TStudentName,
} from "./student.interface";

const nameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGurdian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNumber: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNumber: { type: String },
});

const localGuardianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
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
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemister",
    },
    academicDepertment: {
      type: Schema.Types.ObjectId,
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Query middleware
studentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } }).select("-password");
  next();
});
studentSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } }).select("-password");
  next();
});
studentSchema.pre("updateOne", async function (next) {
  this.find({ isDeleted: { $ne: true } }).select("-password");
  next();
});

//creating a static method;
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = Student.findOne({ id });

  return existingUser;
};

// Create and export the model
const Student = model<TStudent, StudentModel>("Student", studentSchema);
export default Student;
