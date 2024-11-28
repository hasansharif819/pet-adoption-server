import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { UserServices } from "./user.service";
import { jwtHelpers } from "../../helper/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import pick from "../../shared/pick";
import { userFilterableFields } from "./user.constant";

const getUserInfo = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as Secret
  );

  const result = await UserServices.getUserInfo(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as Secret
  );
  const result = await UserServices.updateUserInfo(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserServices.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User retrieved successfully!",
    data: result,
  });
});

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const result = await UserServices.changeStatus(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated!",
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.params;
  const result = await UserServices.deleteUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully!",
    data: result,
  });
});
const analytics = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.analytics();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User analytics retrived successfully!",
    data: result,
  });
});

export const UserControllers = {
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  changeStatus,
  deleteUser,
  analytics,
};
