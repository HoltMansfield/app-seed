"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { startTransition, useActionState } from "react";
import { loginAction } from "./actions";
import { schema, LoginFormInputs } from "./schema";
import ServerError from "@/components/forms/ServerError";
import SubmitButton from "@/components/forms/SubmitButton";
import TextInput from "@/components/forms/TextInput";
import Form from "@/components/forms/Form";

import { redirect } from "next/navigation";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);
  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginFormInputs) => {
    startTransition(() => {
      formAction(data);
    });
  };

  if (state?.success) {
    redirect("/");
  }

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
            {state?.error && <ServerError message={state.error} />}
            <SubmitButton isPending={isPending}>Login</SubmitButton>
          </Form>
        </FormProvider>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-600 hover:underline text-sm">
            Create an account
          </a>
        </div>
      </div>
    </main>
  );
}
