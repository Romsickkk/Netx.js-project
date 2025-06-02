"use client";
import {
  cloneElement,
  HTMLAttributes,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { useActionFeedback } from "../hooks/use-action-feedback";
import { ActionState, EMPTY_ACTION_STATE } from "../utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger:
    | React.ReactElement<HTMLAttributes<HTMLButtonElement>>
    | ((
        isPending: boolean
      ) => React.ReactElement<HTMLAttributes<HTMLButtonElement>>);
  onSuccess?: (actionState: ActionState) => void;
};

function useConfirmDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand consequences.",
  action,
  trigger,
  onSuccess,
}: UseConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE
  );

  const dialogTrigger = cloneElement(
    typeof trigger === "function" ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen((state) => !state),
    }
  );
  const toastRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading("Deleting...");
    } else if (toastRef.current) {
      toastRef.current = toast.dismiss();
    }

    return () => {
      if (toastRef.current) {
        toastRef.current = toast.dismiss();
      }
    };
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) toast.success(actionState.message);

      if (onSuccess) {
        onSuccess(actionState);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) toast.error(actionState.message);
    },
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog];
}

export default useConfirmDialog;
