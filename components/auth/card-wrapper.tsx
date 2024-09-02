"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/react";
import { ReactNode } from "react";
import AuthHeader from "./header";
import { Socials } from "./socials";
import BackButton from "./back-button";

interface Props {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = true,
}: Props) => {
  return (
    <Card w="450px" shadow="md" bg="brand.white" borderRadius="xl" py=".5rem">
      <CardHeader>
        <AuthHeader label={headerLabel} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      {showSocial && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
