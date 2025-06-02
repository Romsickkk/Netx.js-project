"use client";
import { useQueryState } from "nuqs";
import React from "react";

import { searchParser } from "@/features/ticket/search-params";
import SearchInput from "@/ui/search-input";
type TicketSearchInputProps = {
  placeholder: string;
};

function TicketSearchInput({ placeholder }: TicketSearchInputProps) {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
}
export default TicketSearchInput;
