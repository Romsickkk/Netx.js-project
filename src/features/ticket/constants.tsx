import {
  LucideCircleCheck,
  LucideLoaderCircle,
  LucidePencil,
} from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <LucidePencil />,
  IN_PROGRESS: <LucideLoaderCircle />,
  DONE: <LucideCircleCheck />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  DONE: "Done",
  IN_PROGRESS: "In progress",
};
