import express from "express";
import { AdoptionControllers } from "./adoption.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  createAdoptionRequestValidationSchema,
  updateAdoptionRequestValidationSchema,
} from "./adoption.validation";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validateRequest(createAdoptionRequestValidationSchema),
  AdoptionControllers.createAdoptionRequest
);

router.get(
  "/",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdoptionControllers.getAdoptionRequest
);

router.put(
  "/:requestId",
  auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(updateAdoptionRequestValidationSchema),
  AdoptionControllers.updateAdoptionRequestStatus
);

export const AdoptionRoutes = router;
