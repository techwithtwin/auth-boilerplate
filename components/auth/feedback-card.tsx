import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import React from "react";
import BackButton from "./back-button";
import { CgDanger } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface Props {
  message?: string;
  type?: "error" | "success";
}

const FeedbackCard = ({ message, type = "error" }: Props) => {
  return (
    <Card w="400px" shadow="md" bg="brand.white" userSelect="none">
      <CardHeader
        textAlign="center"
        fontWeight="semibold"
        fontSize="xl"
        color={type === "error" ? "red" : "green.500"}
      >
        {message || "Something went wrong"}
      </CardHeader>
      <CardBody justifyContent="center" display="flex">
        {type === "error" ? (
          <CgDanger size="5em" color="red" />
        ) : (
          <IoMdCheckmarkCircleOutline size="5em" color="green" />
        )}
      </CardBody>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
