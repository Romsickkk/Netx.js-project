import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import TicketList from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";
import Heading from "@/ui/Heading";
import Placeholder from "@/ui/Placeholder";
import Spinner from "@/ui/Spinner";

type HomePageParams = {
  searchParams: Promise<SearchParams>;
};

async function HomePage({ searchParams }: HomePageParams) {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All tickets"
        description="Tickets by everyone at one place"
      />
      <ErrorBoundary fallback={<Placeholder label="Something wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={parsedSearchParams} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default HomePage;
