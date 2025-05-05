"use server";

import { revalidatePath } from "next/cache";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function updateTicketStatus(id: string, status: TicketStatus) {
  try {
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
