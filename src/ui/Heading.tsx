import React from "react";

import { Separator } from "@/components/ui/separator";
type HeadingProps = {
  title: string;
  description?: string;
  tabs?: React.ReactNode;
};
function Heading({ title, description, tabs }: HeadingProps) {
  return (
    <>
      {tabs}
      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="">{description}</p>}
      </div>

      <Separator orientation="horizontal" className="h-[1px] bg-gray-200" />
    </>
  );
}

export default Heading;
