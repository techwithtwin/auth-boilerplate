import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: Props) => {
  return (
    <Button variant="link" size="sm" mx="auto" fontWeight="normal">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
