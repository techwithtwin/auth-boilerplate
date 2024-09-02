import LoginButton from "@/components/auth/login-button";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack
      as="main"
      justify="center"
      align="center"
      h="100vh"
      bgGradient="radial(#29cce5,blue.700)"
    >
      <Stack gap={3} align="center">
        <Heading
          color="brand.white"
          fontSize="5xl"
          dropShadow="md"
          fontWeight="semibold"
        >
          🔒Auth
        </Heading>
        <Text color="brand.white" fontSize="xl">
          A simple authentication service
        </Text>
        <LoginButton>
          <Button bg="brand.white">Sign in</Button>
        </LoginButton>
      </Stack>
    </Stack>
  );
}
