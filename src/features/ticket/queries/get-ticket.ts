import { prisma } from "@/lib/prisma";

export async function getTicket(id: string) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
