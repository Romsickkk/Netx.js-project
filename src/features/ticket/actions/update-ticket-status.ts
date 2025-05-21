"use server";

import { revalidatePath } from "next/cache";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function updateTicketStatus(id: string, status: TicketStatus) {
  const session = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });

      if (!ticket || !isOwner(session.user, ticket))
        return toActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  return toActionState("SUCCESS", "Status updated");
}
