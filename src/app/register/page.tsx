"use client";
import { useForm, FormProvider } from "react-hook-form";
import { startTransition, useActionState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerAction } from "./actions";
import { schema, RegisterFormInputs } from "./schema";
import ServerError from "@/components/forms/ServerError";
import SubmitButton from "@/components/forms/SubmitButton";
import TextInput from "@/components/forms/TextInput";
import Form from "@/components/forms/Form";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    undefined
  );
  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RegisterFormInputs) => {
    startTransition(() => {
      formAction(data);
    });
  };

  if (state?.success) {
    redirect("/login");
  }

  return (
    <main className="flex flex-col items-center min-h-screen gap-8 mt-10">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {state?.error && <ServerError message={state.error} />}
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
            <SubmitButton isPending={isPending}>Register</SubmitButton>
          </Form>
        </FormProvider>
      </div>
    </main>
  );
}
