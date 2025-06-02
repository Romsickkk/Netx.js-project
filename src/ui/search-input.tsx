"use client";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

type SearchInputParams = {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
};

function SearchInput({ value, onChange, placeholder }: SearchInputParams) {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={value}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
}

export default SearchInput;
