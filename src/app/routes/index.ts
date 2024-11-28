import express from "express";
import { PetRoutes } from "../modules/pet/pet.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { AdoptionRoutes } from "../modules/adoptionRequest/adoption.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/pets",
    route: PetRoutes,
  },
  {
    path: "/adoption-requests",
    route: AdoptionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
