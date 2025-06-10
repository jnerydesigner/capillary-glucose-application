"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginAction(formData: unknown) {
  const result = schema.safeParse(formData);
  if (!result.success) {
    return { error: "Dados inválidos." };
  }

  const { email, password } = result.data;

  if (email === "admin@example.com" && password === "123456") {
    const cookieStore = await cookies();

    cookieStore.set("session", "valid-token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  }

  return { error: "Credenciais inválidas." };
}