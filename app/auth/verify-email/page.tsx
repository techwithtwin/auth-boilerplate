"use client";
import { verifyEmailAction } from "@/actions/verify-email";
import FeedbackCard from "@/components/auth/feedback-card";

import { Heading, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

const VerifyEmailPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const token = searchParams?.token;

  useEffect(() => {
    async function verifyEmail() {
      if (!token) return;
      await verifyEmailAction(token);
    }
    verifyEmail();
  }, [token]);

  if (!token) return <FeedbackCard />;

  return (
    <Stack align="center">
      <span className="loader"></span>
      <Heading color="brand.white">Verifying email...</Heading>
    </Stack>
  );
};

export default VerifyEmailPage;
