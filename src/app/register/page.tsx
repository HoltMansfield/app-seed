"use client";
import { useForm } from "react-hook-form";
import { Theme, TextField } from "@radix-ui/themes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useTransition } from "react";
import { registerAction } from "./actions";
import { schema, RegisterFormInputs } from "./schema";
import ServerError from "@/components/forms/ServerError";
import SubmitButton from "@/components/forms/SubmitButton";
import TextInput from "@/components/forms/TextInput";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    setServerError("");
    startTransition(() => {
      registerAction(data).catch((err) => {
        setServerError(err.message || "Registration failed");
      });
    });
  };

  return (
    <main className="flex flex-col items-center min-h-screen gap-8 mt-10">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextInput
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <TextInput
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <SubmitButton isPending={isPending}>Register</SubmitButton>
          <ServerError message={serverError} />
        </form>
      </div>
    </main>
  )
}

