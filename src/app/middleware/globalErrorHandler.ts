import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import ApiError from "../errors/ApiError";
import handleDuplicateError from "../errors/handleDuplicateError";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err?.message || "Something went wrong!";
  let errorDetails: any = err;

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err?.code === "P2002") {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  } else if (err instanceof SyntaxError) {
    statusCode = statusCode;
    message = "Syntax error found";
    errorDetails = err;
  } else if (err instanceof PrismaClientValidationError) {
    statusCode = statusCode;
    message = err.message || "Unknown argument";
    errorDetails = err;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorDetails = err;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
