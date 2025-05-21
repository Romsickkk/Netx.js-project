import { getServerSession, NextAuthOptions } from "next-auth";
import { cache } from "react";

import { authOptions } from "@/app/api/auth/lib/auth";

export const getAuth = cache(async () => {
  const session = await getServerSession(authOptions as NextAuthOptions);
  return session ?? null;
});
