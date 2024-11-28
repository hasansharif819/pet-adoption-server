import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import httpStatus from "http-status";

const handleDuplicateError = (err: PrismaClientKnownRequestError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = `User already exists.`;
  const errorDetails = err.meta;

  return {
    statusCode,
    message,
    errorDetails,
  };
};

export default handleDuplicateError;
