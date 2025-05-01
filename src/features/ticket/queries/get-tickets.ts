import { prisma } from "@/lib/prisma";

export async function getTickets() {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
