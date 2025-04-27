import TicketItem from "@/features/ticket/components/ticket-item";

import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketPageParams = {
  params: { ticketId: string };
};

export default async function TicketPage({ params }: TicketPageParams) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}
