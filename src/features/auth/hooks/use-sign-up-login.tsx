"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

import { ActionState } from "@/components/utils/to-action-state";

export function useSignUpLogin(actionState: ActionState) {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      const email = actionState.payload?.get("email") as string;
      const password = actionState.payload?.get("password") as string;

      if (email && password) {
        signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/tickets",
        });
      } else {
        console.error("Нет email или password для signIn");
      }
    }
  }, [actionState]);
}
