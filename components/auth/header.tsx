import { Heading, Stack, Text } from "@chakra-ui/react";

interface Props {
  label: string;
}

const AuthHeader = ({ label }: Props) => {
  return (
    <Stack gap={4} align="center">
      <Heading fontSize="3xl" fontWeight="semibold">
        🔒 Auth
      </Heading>
      <Text color="brand.gray" fontSize="sm">
        {label}
      </Text>
    </Stack>
  );
};

export default AuthHeader;
