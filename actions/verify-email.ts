"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/data/user";
import { getVerificationTokenByToken } from "@/utils/data/verification-token";
import { redirect } from "next/navigation";

/**
 * The action to verify the email of a user
 * @param {string} token The verification token
 * @returns {Promise<void>}
 */

export const verifyEmailAction = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return redirect(returnUrl("invalid-token"));
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return redirect(returnUrl("user-not-found"));

  if (existingUser.emailVerified) {
    return redirect(returnUrl('email-already-verified"'));
  }

  if (existingToken.expiresAt < new Date())
    return redirect(
      `/auth/verify-email/feedback?feedbackType=token-expired&token=${token}`
    );

  const updatedUser = await db.user.update({
    where: { email: existingToken.email },
    data: { emailVerified: new Date() },
  });

  if (updatedUser) {
    await db.verificationToken.delete({
      where: { token },
    });

    return redirect(returnUrl("email-verified"));
  }

  return redirect(returnUrl("something-went-wrong"));
};

function returnUrl(error: string) {
  return `/auth/verify-email/feedback?feedbackType=${error}`;
}
