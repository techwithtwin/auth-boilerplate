import { AlertFeedbackType } from "@/types";
import { Alert, AlertIcon } from "@chakra-ui/react";

const AlertFeedback = ({ message, status = "error" }: AlertFeedbackType) => {
  if (!message || !status) return null;
  return (
    <Alert status={status} borderRadius="md">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default AlertFeedback;
