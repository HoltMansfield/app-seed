"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useTransition } from "react";
import { registerAction } from "./actions";

import { schema, RegisterFormInputs } from "./schema";

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
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="border rounded px-3 py-2"
            autoComplete="email"
          />
          {errors.email && (
            <div className="text-red-600 text-xs italic" role="alert">
              {errors.email.message}
            </div>
          )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border rounded px-3 py-2"
            autoComplete="new-password"
          />
          {errors.password && (
            <div className="text-red-600 text-xs italic" role="alert">
              {errors.password.message}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2"
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </button>
          {serverError && (
            <div className="text-sm text-center mt-2 text-red-600">{serverError}</div>
          )}
        </form>
      </div>
    </main>
  );
}

