import { Prisma } from "@/generated/prisma";

export type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};

export type TicketWithMetadata = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}> & { isOwner: boolean };
