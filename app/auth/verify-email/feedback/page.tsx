import FeedbackCard from "@/components/auth/feedback-card";
import ExpiredTokenCard from "@/components/auth/expired-token";
import { feedbackTypes } from "@/types";

const FeedbackPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const feedbackType = searchParams?.feedbackType;
  const token = searchParams?.token;

  if (!feedbackType || !feedbackTypes.includes(feedbackType))
    return <FeedbackCard />;

  if (token && feedbackType === "token-expired") {
    return <ExpiredTokenCard token={token} />;
  }
  if (feedbackType === "email-verified")
    return <FeedbackCard message="Horray! Email Verified!" type="success" />;

  if (feedbackType === "verification-resend-success")
    return (
      <FeedbackCard
        message="Verification email resent successfully"
        type="success"
      />
    );

  return <FeedbackCard message={messageFromFeedbackType(feedbackType)} />;
};

export default FeedbackPage;

function messageFromFeedbackType(feedback: string): string {
  return feedback
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
