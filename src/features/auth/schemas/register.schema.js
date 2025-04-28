import { z } from "zod";

export const sigupSchema = z.object({
  name: z.string().min(3, { message: "Minimum 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Minimum 6 caractères" }),
});
