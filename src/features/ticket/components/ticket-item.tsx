import clsx from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPath } from "@/paths";

import TICKET_ICONS from "../constants";
import { type Ticket } from "../type";

type TicketItem = {
  ticket: Ticket;
  isDetail?: boolean;
};

function TicketItem({ ticket, isDetail }: TicketItem) {
  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link href={`${ticketPath(ticket.id)}`} className="text-sm">
        <LucideSquareArrowOutUpRight className="w-6 h-6" />
      </Link>
    </Button>
  );
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
      </Card>
      {!isDetail && <div className="flex flex-col gap-y-1">{detailButton}</div>}
    </div>
  );
}

export default TicketItem;
