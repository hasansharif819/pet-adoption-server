export type TErrorSources = {
  field: string;
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: TErrorSources;
};
