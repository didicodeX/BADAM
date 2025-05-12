import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, { message: "Minimum 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Minimum 8 caractères" }),
});
