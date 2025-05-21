"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Ticket } from "@/generated/prisma";
import { ticketPath } from "@/paths";

type ClientBreadcrumbsProps = {
  ticket: Ticket;
  pageTitle?: string;
};

export function ClientBreadcrumbs({
  ticket,
  pageTitle,
}: ClientBreadcrumbsProps) {
  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Tickets", href: ticketPath(ticket.id) },
        { title: ticket.title, href: ticketPath(ticket.id) },
        ...(pageTitle ? [{ title: pageTitle }] : []),
      ]}
    />
  );
}
