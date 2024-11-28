import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  changePasswordZodSchema,
  createUserValidationSchema,
  loginValidationSchema,
  refreshTokenZodSchema,
} from "./auth.validation";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  AuthControllers.createUser
);

router.post(
  "/change-password",
  validateRequest(changePasswordZodSchema),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  AuthControllers.changePassword
);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenZodSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
