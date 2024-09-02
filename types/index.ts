export type AlertFeedbackType = {
  message?: string;
  status?: "error" | "success" | "warning" | "info" | undefined;
};

export const feedbackTypes = [
  "email-verified",
  "token-expired",
  "invalid-token",
  "user-not-found",
  "email-already-verified",
  "something-went-wrong",
  "verification-resend-failed",
  "verification-resend-success",
];
