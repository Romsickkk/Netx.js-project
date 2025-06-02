"use server";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export default async function getComments(ticketId: string, cursor?: string) {
  const session = await getAuth();
  const take = 5;

  const where = {
    ticketId,
    id: {
      lt: cursor,
    },
  };

  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        { id: "desc" },
      ],
    }),
    prisma.comment.count({
      where: {
        ticketId,
      },
    }),
  ]);

  const hasNextPage = comments.length > take;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(session?.user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: comments.at(-1)?.id,
    },
  };
}
