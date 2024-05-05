import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { cathcAsync } from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

const getSingleAdmin = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is retrieved succesfully",
    data: result,
  });
});

const getAllAdmins = cathcAsync(async (req, res) => {
  const result = await adminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved succesfully",
    data: result,
  });
});

const updateAdmin = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is updated succesfully",
    data: result,
  });
});

const deleteAdmin = cathcAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.deleteAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is deleted succesfully",
    data: result,
  });
});

export const adminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
