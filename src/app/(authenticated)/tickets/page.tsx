import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getAuth } from "@/features/auth/queries/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
<<<<<<< HEAD:src/app/tickets/page.tsx
import Spinner from "@/ui/Spinner";

import CardCompact from "../../ui/card-compact";
import Heading from "../../ui/Heading";
import Placeholder from "../../ui/Placeholder";
=======
import CardCompact from "@/ui/card-compact";
import Heading from "@/ui/Heading";
import Placeholder from "@/ui/Placeholder";
import Spinner from "@/ui/Spinner";

async function TicketsPage() {
  const session = await getAuth();
>>>>>>> dev:src/app/(authenticated)/tickets/page.tsx

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My tickets" description="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <ErrorBoundary fallback={<Placeholder label="Something wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList userId={session?.user.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TicketsPage;
