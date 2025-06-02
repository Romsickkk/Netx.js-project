import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

import { ParsedSearchParams } from "../search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams
) {
  const resolvedSearchParams = searchParams;
  const rawSearch = resolvedSearchParams.search;
  const search = typeof rawSearch === "string" ? rawSearch.trim() : undefined;
  const session = await getAuth();

  const where = {
    userId,
    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);
  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(session?.user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
}
