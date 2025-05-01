"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma";
import { upsertTicket } from "../actions/upsert-ticket";
import SubmitButton from "@/components/form/submit-button";
import { useActionState, useEffect } from "react";
import FieldError from "@/components/form/field-error";
import { EMPTY_ACTION_STATE } from "@/components/utils/to-actionState";
import { useActionFeedback } from "@/components/hooks/use-action-feedback";
type TicketUpsertFormProps = {
  ticket?: Ticket;
};

function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  useActionFeedback(actionState);

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {/* <Input name="id" type="hidden" defaultValue={ticket.id} /> */}

      <Label htmlFor="title">Title</Label>
      <Input
        id="content"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="Content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </form>
  );
}

export default TicketUpsertForm;
