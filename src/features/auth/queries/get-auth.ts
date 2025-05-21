import { getServerSession, NextAuthOptions } from "next-auth";

import { authOptions } from "@/app/api/auth/lib/auth";
import { cache } from "react";

export const getAuth = cache(async () => {
  const session = await getServerSession(authOptions as NextAuthOptions);
  return session ?? null;
});
