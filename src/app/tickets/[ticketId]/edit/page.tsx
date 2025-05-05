import { notFound } from "next/navigation";

import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import CardCompact from "../../../../ui/card-compact";

async function TicketEditPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className=" w-full max-w-[420px] animate-fade-in-form-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
}

export default TicketEditPage;
