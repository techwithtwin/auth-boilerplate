import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      h="100vh"
      bgGradient="radial(#29cce5,blue.700)"
      justify="center"
      align="center"
    >
      {children}
    </Flex>
  );
};

export default AuthLayout;
