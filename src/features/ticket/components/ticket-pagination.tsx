"use client";
import { useQueryState, useQueryStates } from "nuqs";
import React, { useEffect, useRef } from "react";

import { PaginatedData } from "@/types/pagination";
import Pagination from "@/ui/pagination";

import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

function TicketPagination({ paginatedTicketMetadata }: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;

    prevSearch.current = search;
    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      paginatedTicketMetadata={paginatedTicketMetadata}
      pagination={pagination}
      onPagination={setPagination}
    />
  );
}

export default TicketPagination;
