import { auth, signOut } from "@/auth";
import { Button, Stack, Text } from "@chakra-ui/react";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <Stack m="3">
      <Text color="brand.black"> {JSON.stringify(session)}</Text>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" colorScheme="teal">
          Sign Out
        </Button>
      </form>
    </Stack>
  );
};

export default SettingsPage;
