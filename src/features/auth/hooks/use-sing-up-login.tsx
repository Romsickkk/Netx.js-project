"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ActionState } from "@/components/utils/to-action-state";
import { ticketsPath } from "@/paths";

export function useSignUpLogin(actionState: ActionState) {
  const router = useRouter();

  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      const formData = actionState.formData;
      const email = formData?.get("email") as string;
      const password = formData?.get("password") as string;

      signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          router.push("/tickets");
        } else {
          console.error("Auto-login failed after sign up");
        }
      });
    }
  }, [actionState, router]);
}
