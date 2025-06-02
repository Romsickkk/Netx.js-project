"use client";

import { Select } from "@radix-ui/react-select";
import React from "react";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortSelectOption = {
  sortKey: string;
  label: string;
  sortValue: string;
};

type SortObject = {
  sortKey: string;

  sortValue: string;
};
type TicketSortSelectParams = {
  options: SortSelectOption[];
  value?: SortObject;
  onChange: (sort: SortObject) => void;
};

function SortSelect({ onChange, options }: TicketSortSelectParams) {
  function handleSort(compositeKey: string) {
    const [sortKey, sortValue] = compositeKey.split("_");

    onChange({ sortKey, sortValue });
  }

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={options[0].sortKey + "_" + options[0].sortValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option.sortKey + " " + option.sortValue}
              value={option.sortKey + "_" + option.sortValue}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortSelect;
