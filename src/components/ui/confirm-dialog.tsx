"use client";
import { cloneElement, HTMLAttributes, useActionState, useState } from "react";

import Form from "../form/form";
import SubmitButton from "../form/submit-button";
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

type UseConfirmDialogProps = {
  title?: string;
  descriptin?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<HTMLAttributes<HTMLButtonElement>>;
};

function useConfirmDialog({
  title = "Are you absolutely sure?",
  descriptin = "This action cannot be undone. Make sure you understand consequences.",
  action,
  trigger,
}: UseConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  function handleSuccess() {
    setIsOpen(false);
  }
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{descriptin}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccsess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog];
}

export default useConfirmDialog;
