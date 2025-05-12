"use client";
import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import { useActionState, useEffect } from "react";
import { signIn } from "../actions/sign-in";

import { redirect } from "next/navigation";
import { ticketsPath } from "@/paths";

function SignInForm() {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      redirect(ticketsPath());
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
