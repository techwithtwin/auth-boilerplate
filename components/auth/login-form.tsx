"use client";
import { loginAction } from "@/actions/login";
import { LoginSchema } from "@/schemas";
import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AlertFeedback from "../feedback";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { AlertFeedbackType } from "@/types";

export type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already linked to another Provider."
      : "";
  const [feedback, setFeedback] = useState<AlertFeedbackType>({
    message: "",
    status: undefined,
  });
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    startTransition(() => {
      loginAction(data).then((res) => {
        setFeedback({ message: res.message, status: res.status });
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="john.doe@example.com"
            {...register("email")}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="******"
            {...register("password")}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>{" "}
        <AlertFeedback
          message={feedback.message ? feedback.message : urlError}
          status={feedback.status}
        />
        <Button
          type="submit"
          isLoading={isPending || isSubmitting}
          bg="brand.black"
          color="brand.white"
          _hover={{
            bg: "brand.blackHover",
          }}
        >
          Login
        </Button>
      </Stack>
    </CardWrapper>
  );
};
