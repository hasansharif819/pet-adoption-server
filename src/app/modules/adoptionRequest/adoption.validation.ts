import { z } from "zod";

export const createAdoptionRequestValidationSchema = z.object({
  petId: z.string().uuid(),
  petOwnershipExperience: z.string(),
});

export const updateAdoptionRequestValidationSchema = z.object({
  status: z.string(),
});
