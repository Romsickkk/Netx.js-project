"use server";

import { cookies } from "next/headers";

export async function getCookieByKey(key: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);

  return cookie?.value ?? null;
}

export async function setCookieByKey(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
}

export async function deleteCookieByKey(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}
