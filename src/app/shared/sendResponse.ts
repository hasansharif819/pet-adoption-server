import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  jsonData: {
    success: boolean;
    statusCode: number;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T | null | undefined;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    statusCode: jsonData.statusCode,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined,
  });
};

export default sendResponse;
