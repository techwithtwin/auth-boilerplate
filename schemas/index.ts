import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(4, { message: "Password is required" }).max(15),
});

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Minimum of 3 characters required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Minimum of 6 characters required" })
    .max(15),
});
