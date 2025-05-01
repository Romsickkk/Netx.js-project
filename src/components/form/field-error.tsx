import React from "react";
import { ActionState } from "../utils/to-actionState";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

function FieldError({ actionState, name }: FieldErrorProps) {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return <span className="text-red-700">{message}</span>;
}

export default FieldError;
