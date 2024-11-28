import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {
  const errorMessageArray = err?.issues?.map((issue: ZodIssue) => {
    return `${issue?.path} is required.`;
  });
  const errorDetails = err.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  const errorMessage = errorMessageArray.join(" ");

  return {
    statusCode,
    message: errorMessage,
    errorDetails: errorDetails,
  };
};

export default handleZodError;
