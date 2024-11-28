export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
