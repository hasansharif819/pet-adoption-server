import express from "express";
import { UserControllers } from "./user.controller";
import {
  changeUserStatus,
  updateUserValidationSchema,
} from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.getAllUsers
);
router.get(
  "/profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserControllers.getUserInfo
);
router.get(
  "/analytics",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.analytics
);

router.patch(
  "/update-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUserInfo
);

router.patch(
  "/update-status/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(changeUserStatus),
  UserControllers.changeStatus
);

router.delete(
  "/delete/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  UserControllers.deleteUser
);

export const UserRoutes = router;
