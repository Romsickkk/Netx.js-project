import Link from "next/link";

import { ticketsPath } from "@/paths";
import Heading from "@/ui/Heading";
import { ErrorBoundary } from "react-error-boundary";
import TicketList from "@/features/ticket/components/ticket-list";

import Placeholder from "@/ui/Placeholder";
import Spinner from "@/ui/Spinner";
import { Suspense } from "react";

async function HomePage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All tickets"
        description="Tickets by everyone at one place"
      />
      <div className="flex-1 flex flex-col items-center"></div>
      <ErrorBoundary fallback={<Placeholder label="Something wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
