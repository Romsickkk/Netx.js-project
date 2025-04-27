import { LucideTriangleAlert } from "lucide-react";
import React, { cloneElement } from "react";

type PlaceholderPros = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactNode;
};

function Placeholder({
  label,
  icon = <LucideTriangleAlert />,
  button = <div className="h-10" />,
}: PlaceholderPros) {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, { className: "w-16 h-16" })}
      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  );
}

export default Placeholder;
