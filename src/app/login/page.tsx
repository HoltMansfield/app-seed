"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useTransition } from "react";
import { loginAction } from "./actions";
import { schema, LoginFormInputs } from "./schema";
import ServerError from "@/components/forms/ServerError";
import SubmitButton from "@/components/forms/SubmitButton";
import TextInput from "@/components/forms/TextInput";
import Form from "@/components/forms/Form";

export default async function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");
  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: LoginFormInputs) => {
    setServerError("");
    startTransition(() => {

      loginAction(data).catch((err) => {
        setServerError(err.message || "Login failed");
      });
    });  
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              autoComplete="email"
              disabled={isPending}
            />
            <TextInput
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              autoComplete="new-password"
              disabled={isPending}
            />
            <SubmitButton isPending={isPending}>Login</SubmitButton>
            <ServerError message={serverError} />
          </Form>
        </FormProvider>
        <div className="mt-4 text-center">
          <a
            href="/register"
            className="text-blue-600 hover:underline text-sm"
          >
            Create an account
          </a>
        </div>
      </div>
    </main>
  );
}
