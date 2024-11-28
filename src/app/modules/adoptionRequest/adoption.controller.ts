import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { AdoptionServices } from "./adoption.service";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helper/jwtHelpers";
import config from "../../config";
import ApiError from "../../errors/ApiError";

const createAdoptionRequest = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    const { id } = jwtHelpers.verifyToken(
      token,
      config.jwt.access_secret as Secret
    );

    const result = await AdoptionServices.createAdoptionIntoDb(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

const getAdoptionRequest = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
  }
  const { id } = jwtHelpers.verifyToken(
    token,
    config.jwt.access_secret as Secret
  );

  const result = await AdoptionServices.getAdoptionRequest(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const updateAdoptionRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
    const { id } = jwtHelpers.verifyToken(
      token,
      config.jwt.access_secret as Secret
    );
    const { requestId } = req.params;

    const result = await AdoptionServices.updateAdoptionRequestStatus(
      id,
      requestId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Adoption request updated successfully",
      data: result,
    });
  }
);

export const AdoptionControllers = {
  createAdoptionRequest,
  getAdoptionRequest,
  updateAdoptionRequestStatus,
};
