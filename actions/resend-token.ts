"use server";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getVerificationTokenByToken } from "@/utils/data/verification-token";
import { redirect } from "next/navigation";

export const resendVerificationEmailAction = async (token: string) => {
  if (!token) return redirect(returnUrl("invalid-token"));
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return redirect(returnUrl('invalid-token"'));

  const verificationToken = await generateVerificationToken(
    existingToken.email
  );
  const emailId = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );

  if (!emailId || !verificationToken)
    return redirect(returnUrl("verification-resend-failed"));

  return redirect(returnUrl("verification-resend-success"));
};

function returnUrl(error: string) {
  return `/auth/verify-email/feedback?feedbackType=${error}`;
}
