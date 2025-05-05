import React from "react";
import { toast } from "sonner";

import { useActionFeedback } from "../hooks/use-action-feedback";
import { type ActionState } from "../utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccsess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

function Form({
  action,
  actionState,
  children,
  onSuccsess,
  onError,
}: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) toast.success(actionState.message);

      if (onSuccsess) {
        onSuccsess(actionState);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) toast.error(actionState.message);
      if (onError) {
        onError(actionState);
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
}

export default Form;
