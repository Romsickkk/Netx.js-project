import { redirect } from "next/navigation";

import { singInPath } from "@/paths";

import { getAuth } from "./get-auth";

export async function getAuthOrRedirect() {
  const session = await getAuth();

  if (!session?.user) {
    redirect(singInPath());
  }

  return session;
}
