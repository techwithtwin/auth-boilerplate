import { RESEND_API_KEY } from "@/config";
import { Resend } from "resend";

const resend = new Resend(RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = "http://localhost:3000/auth/verify-email?token=" + token;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    text: `Click the link to verify your email: ${confirmLink}`,
    html: `<a href="${confirmLink}">Verify your email</a>`,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
