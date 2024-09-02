"use server";

import { LoginFormData } from "@/components/auth/login-form";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/utils/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { AlertFeedbackType } from "@/types";
import { sendVerificationEmail } from "@/lib/mail";

export const loginAction = async (
  values: LoginFormData
): Promise<AlertFeedbackType> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return Promise.resolve({
      status: "error",
      message: "Invalid email or password",
    });
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return Promise.resolve({
      status: "error",
      message: "Invalid email or password",
    });
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    const emailId = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return Promise.resolve({
      status: "warning",
      message: "Email not verified. Confirmation email sent.",
    });
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
    });

    return Promise.resolve({
      status: "success",
      message: "Logged in successfully",
    });
  } catch (error) {
    // TODO: Log error
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return Promise.resolve({
            status: "error",
            message: "Invalid email or password",
          });
        default:
          return Promise.resolve({
            status: "error",
            message: "An error occurred while logging in",
          });
      }
    }

    throw error;
  }
};
