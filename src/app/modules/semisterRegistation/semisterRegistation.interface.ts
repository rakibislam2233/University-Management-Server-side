import { Types } from "mongoose";

export type TSemisterRegistation = {
  academicSemister: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
