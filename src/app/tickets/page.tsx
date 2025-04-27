import Heading from "@/ui/Heading";

import { Suspense } from "react";

import TicketList from "@/features/ticket/components/ticket-list";
import Spinner from "@/ui/Spinner";
import { ErrorBoundary } from "react-error-boundary";
import Placeholder from "@/ui/Placeholder";

function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <ErrorBoundary fallback={<Placeholder label="Something wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TicketsPage;
