import { LucideLoader } from "lucide-react";

function Spinner() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center">
      <div className="animate-spin">
        <LucideLoader size={50} />
      </div>
    </div>
  );
}

export default Spinner;
