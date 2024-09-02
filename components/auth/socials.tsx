"use client";

import { Button, Flex } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

export const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    });
  };
  return (
    <Flex align="center" gap={2} w="100%">
      <Button w="100%" variant="outline" onClick={() => onClick("google")}>
        <FcGoogle
          style={{
            fontSize: "1.5rem",
          }}
        />
      </Button>
      <Button w="100%" variant="outline" onClick={() => onClick("github")}>
        <FaGithub
          style={{
            fontSize: "1.5rem",
          }}
        />
      </Button>
    </Flex>
  );
};
