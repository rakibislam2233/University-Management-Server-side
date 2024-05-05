export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "faculty" | "student";
  status: "is-progress" | "block";
  isDeleted: boolean;
};
