"use client";

import { useQueryStates } from "nuqs";
import React from "react";

import SortSelect, { SortSelectOption } from "@/ui/sort-select";

import { sortOptions, sortParser } from "../search-params";
type TicketSortSelectProps = {
  options: SortSelectOption[];
};

function TicketSortSelect({ options }: TicketSortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);
  return <SortSelect options={options} value={sort} onChange={setSort} />;
}

export default TicketSortSelect;
