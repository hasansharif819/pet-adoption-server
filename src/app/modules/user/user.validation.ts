import z from "zod";

export const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const changeUserStatus = z.object({
  role: z.enum(["ADMIN", "USER"]),
  status: z.enum(["DEACTIVE", "ACTIVE", "DELETED"]),
});
