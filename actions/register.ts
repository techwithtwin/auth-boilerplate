"use server";

import { RegisterFormData } from "@/components/auth/register-form";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { AlertFeedbackType } from "@/types";
import { sendVerificationEmail } from "@/lib/mail";

export const registerAction = async (
  values: RegisterFormData
): Promise<AlertFeedbackType> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return Promise.resolve({
      status: "error",
      message: "Invalid email or password",
    });
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return Promise.resolve({
      status: "error",
      message: "Email already in use",
    });
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return Promise.resolve({
    status: "success",
    message: "Confirmation email sent. Please check your inbox.",
  });
};
