import React from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginatedData } from "@/types/pagination";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedTicketMetadata: PaginatedData<unknown>["metadata"];
};

function Pagination({
  pagination,
  onPagination,
  paginatedTicketMetadata: { count, hasNextPage },
}: PaginationProps) {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Number(Math.min(endOffset, count));

  const label = `${startOffset}  - ${actualEndOffset} of ${count}`;

  function handlePrevious() {
    onPagination({ ...pagination, page: pagination.page - 1 });
  }

  function handleNext() {
    onPagination({ ...pagination, page: pagination.page + 1 });
  }

  function handleChangeSize(size: string) {
    onPagination({ page: 0, size: parseInt(size) });
  }

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePrevious}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage || actualEndOffset === count}
      onClick={handleNext}
    >
      Next
    </Button>
  );

  const size = (
    <Select
      onValueChange={handleChangeSize}
      defaultValue={pagination.size.toString()}
    >
      <SelectTrigger className="h-[36px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {size}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}

export default Pagination;
