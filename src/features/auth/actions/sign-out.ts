"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { singInPath } from "@/paths";

import { getAuth } from "../queries/get-auth";

export async function signOut() {
  const session = await getAuth();

  if (!session) {
    return redirect(singInPath());
  }

  const cookieStore = await cookies();

  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");

  return redirect(singInPath());
}
