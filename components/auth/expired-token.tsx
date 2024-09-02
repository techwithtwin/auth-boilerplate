"use client";
import { resendVerificationEmailAction } from "@/actions/resend-token";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { useTransition } from "react";
import { CgDanger } from "react-icons/cg";
import BackButton from "./back-button";

const ExpiredTokenCard = ({ token }: { token: string }) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(() => {
      resendVerificationEmailAction(token);
    });
  };
  return (
    <Card w="400px" shadow="md" bg="brand.white" userSelect="none">
      <CardHeader
        textAlign="center"
        fontWeight="semibold"
        fontSize="xl"
        color="red"
      >
        Ooops! Your token has expired!
      </CardHeader>
      <CardBody alignItems="center" display="flex" flexDir="column" gap={6}>
        <CgDanger size="5em" color="red" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            colorScheme="blue"
            size="sm"
          >
            Resend Verification Email
          </Button>
        </form>
      </CardBody>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};

export default ExpiredTokenCard;
