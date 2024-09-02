"use client";

import { RegisterSchema } from "@/schemas";
import {
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { registerAction } from "@/actions/register";
import { AlertFeedbackType } from "@/types";
import { useRouter } from "next/navigation";
import AlertFeedback from "../feedback";
import CardWrapper from "./card-wrapper";

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const toast = useToast();

  const [feedback, setFeedback] = useState<AlertFeedbackType>({
    message: "",
    status: undefined,
  });
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: RegisterFormData) => {
    startTransition(() => {
      registerAction(data).then((res) => {
        setFeedback({ message: res.message, status: res.status });
        if (res.status === "success") {
          reset();
          toast({
            title: "Account created.",
            description: "Confirmation email sent. Please check your inbox.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });

          router.push("/auth/login");
        } else resetField("password");
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Have an account? Login here."
      backButtonHref="/auth/login"
    >
      <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="name"
            disabled={isPending || isSubmitting}
            id="name"
            placeholder="John Doe"
            {...register("name")}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            disabled={isPending || isSubmitting}
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
            disabled={isPending || isSubmitting}
            placeholder="******"
            {...register("password")}
          />
          <FormErrorMessage>
            <FormErrorIcon />
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>{" "}
        <AlertFeedback message={feedback.message} status={feedback.status} />
        <Button
          type="submit"
          isLoading={isPending}
          bg="brand.black"
          color="brand.white"
          _hover={{
            bg: "brand.blackHover",
          }}
        >
          Sign Up
        </Button>
      </Stack>
    </CardWrapper>
  );
};
