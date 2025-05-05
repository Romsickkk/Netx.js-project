// import { PrismaClient } from "@/generated/prisma";

// const prisma = new PrismaClient();

// type initialTicketsType = {
//   title: string;
//   content: string;
//   status: "OPEN" | "DONE" | "IN_PROGRESS";
// };
// const tickets: initialTicketsType[] = [
//   {
//     title: "Ticket 1",
//     content: "This is the first ticket",
//     status: "DONE",
//   },
//   {
//     title: "Ticket 2",
//     content: "This is the second ticket",
//     status: "OPEN",
//   },
//   {
//     title: "Ticket 3",
//     content: "This is the third ticket",
//     status: "IN_PROGRESS",
//   },
// ];

// async function seed() {
//   await prisma.ticket.deleteMany();
//   //   for (const ticket of tickets) {
//   //     await prisma.ticket.create({
//   //       data: ticket,
//   //     });
//   //   }

//   //   ================================================
//   //   const promises = tickets.map((ticket) =>
//   //     promises.ticket.create({ data: ticket })
//   //   );
//   //   await Promise.apply(promises);

//   // ========================================
//   await prisma.ticket.createMany({ data: tickets });
// }

// seed();
