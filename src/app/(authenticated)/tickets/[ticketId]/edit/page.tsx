import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/lib/auth";
import { ClientBreadcrumbs } from "@/components/ui/client-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { isOwner } from "@/features/auth/utils/is-owner";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import CardCompact from "@/ui/card-compact";

async function TicketEditPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const session = await getServerSession(authOptions);

  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketOwner = isOwner(session?.user, ticket);

  if (!ticket || !isTicketOwner) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <ClientBreadcrumbs ticket={ticket} pageTitle="Edit" />

      <Separator />
      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket"
          className=" w-full max-w-[420px] animate-fade-in-form-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
}

export default TicketEditPage;
