import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export async function getTicket(id: string) {
  const session = await getAuth();
  const ticket = await prisma.ticket.findUnique({
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
  if (!ticket) {
    return null;
  }
  return { ...ticket, isOwner: isOwner(session?.user, ticket) };
}
