import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
  icon?: React.ReactElement;
};

const SubmitButton = ({ label, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button disabled={pending} type="submit">
        {icon}
        {pending && (
          <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        {label}
      </Button>
    </>
  );
};

export default SubmitButton;
