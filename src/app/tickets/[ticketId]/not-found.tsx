import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Placeholder from "../../../ui/placeholder";

function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath()}>Go to tickets</Link>
        </Button>
      }
    ></Placeholder>
  );
}

export default NotFound;
