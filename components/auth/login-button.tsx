"use client";

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({ children, mode = "redirect", asChild }: Props) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    // Todo: Implement modal
    return <Box as="span">TODO: Implement Modal</Box>;
  }
  return (
    <Box as="span" onClick={onClick}>
      {children}
    </Box>
  );
};

export default LoginButton;
