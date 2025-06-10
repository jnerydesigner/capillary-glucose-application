"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { loginAction } from "@/lib/actions/authenticate";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const result = await loginAction(data);
    if (result?.error) {
      setServerError(result.error);
    } else {
      window.location.href = "/glucose"; // ou useRouter
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <input
          {...register("email")}
          id="email"
          placeholder="seuemail@exemplo.com"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          {...register("password")}
          id="password"
          placeholder="********"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-red-500 text-sm text-center">{serverError}</p>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-opacity-90 transition"
      >
        Entrar
      </button>
    </form>
  );
};
