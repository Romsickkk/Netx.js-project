import clsx from "clsx";
import {
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@/generated/prisma";
import { ticketEditPath } from "@/paths";

import { deleteTicket } from "../actions/delete-ticket";
import TICKET_ICONS from "../constants";
import { toCurrencyFromCent } from "@/utils/currency";
import TicketMoreMenu from "./ticket-more-menu";

type TicketItem = {
  ticket: Ticket;
  isDetail?: boolean;
};

function TicketItem({ ticket, isDetail }: TicketItem) {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketEditPath(ticket.id)} className="text-sm">
        <LucideSquareArrowOutUpRight className="w-4 h-4 stroke-[1.5]" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={`/tickets/${ticket.id}/edit`}>
        <LucidePencil className="h-4 w-4 stroke-[1.5]" />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon">
        <LucideTrash className="h-4 w-4 stroke-[1.5]" />
      </Button>
    </form>
  );

  const moreMenu = <TicketMoreMenu ticket={ticket} />;

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[587px]": isDetail,
        "max-w-[428px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
            {deleteButton}
          </>
        )}
      </div>
    </div>
  );
}

export default TicketItem;
