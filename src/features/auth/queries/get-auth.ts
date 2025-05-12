import { getServerSession, NextAuthOptions } from "next-auth";

import { authOptions } from "@/app/api/auth/lib/auth";

export async function getAuth() {
  const session = await getServerSession(authOptions as NextAuthOptions);

  if (!session) return null;

  return session;
}
