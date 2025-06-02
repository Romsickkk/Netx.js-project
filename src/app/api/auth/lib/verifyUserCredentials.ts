import argon2 from "argon2";

import { prisma } from "@/lib/prisma";

export async function verifyUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await argon2.verify(user.password, password);
  if (!isValid) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.username,
  };
}
