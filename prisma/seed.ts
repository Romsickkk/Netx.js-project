import { PrismaClient } from "@/generated/prisma";
import argon2 from "argon2";

const prisma = new PrismaClient();

type initialTicketsType = {
  title: string;
  content: string;
  status: "OPEN" | "DONE" | "IN_PROGRESS";
  deadline: string;
  bounty: number;
};

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user1",
    email: "test@test.com",
  },
];

const tickets: initialTicketsType[] = [
  {
    title: "Ticket 1",
    content: "This is the first ticket",
    status: "DONE",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket",
    status: "OPEN",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket",
    status: "IN_PROGRESS",
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

async function seed() {
  const t0 = performance.now();
  console.log("DB Seed: Started...");

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await argon2.hash("123123", {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

  const dbUser = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      password: passwordHash,
    })),
  });

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUser[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
}

seed();
