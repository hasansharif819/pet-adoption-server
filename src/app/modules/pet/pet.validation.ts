import { z } from "zod";

export const createPetValidationSchema = z.object({
  name: z.string(),
  species: z.string(),
  breed: z.string(),
  age: z.number().int().positive(),
  size: z.string(),
  location: z.string(),
  description: z.string(),
  medicalHistory: z.array(z.string()),
  temperament: z.array(z.string()),
  adoptionRequirements: z.array(z.string()),
  image: z.string().url(),
});

export const updatePetValidationSchema = z.object({
  name: z.string().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  age: z.number().int().positive().optional(),
  size: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  medicalHistory: z.array(z.string()).optional(),
  temperament: z.array(z.string()).optional(),
  adoptionRequirements: z.array(z.string()).optional(),
});
