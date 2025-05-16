"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import { ticketsPath } from "@/paths";

import { signIn } from "../actions/sign-in";

function SignInForm() {
  const router = useRouter();

  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      router.push(ticketsPath());
    }
  }, [actionState]);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <Input name="password" placeholder="Password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
}

export default SignInForm;
