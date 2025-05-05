"use client";

import { useActionState, useRef } from "react";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/components/utils/to-action-state";
import { Ticket } from "@/generated/prisma";
import DatePicker, { ImperativeHandleFromDatePicker } from "@/ui/date-picker";
import { fromCent } from "@/utils/currency";

import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  const datePickerImperetiveHandleRef =
    useRef<ImperativeHandleFromDatePicker>(null);

  function handleSuccess() {
    datePickerImperetiveHandleRef.current?.reset();
  }

  return (
    <Form action={action} actionState={actionState} onSuccsess={handleSuccess}>
      {/* <Input name="id" type="hidden" defaultValue={ticket.id} /> */}{" "}
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
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>

          <DatePicker
            // key={actionState.timestamp}
            id="dealdline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperetiveHandleRef={datePickerImperetiveHandleRef}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>

        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
}

export default TicketUpsertForm;
