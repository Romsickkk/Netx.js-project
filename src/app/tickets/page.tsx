import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import Placeholder from "@/ui/Placeholder";
import Spinner from "@/ui/Spinner";
import { getBaseUrl } from "@/utils/url";

import CardCompact from "../../ui/card-compact";
import Heading from "../../ui/Heading";

function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <ErrorBoundary fallback={<Placeholder label="Something wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TicketsPage;
