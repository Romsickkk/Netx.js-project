import React from "react";
import { getTickets } from "../queries/get-tickets";
import TicketItem from "./ticket-item";

async function TicketList() {
  const tickets = await getTickets();
  return (
    <>
      {tickets.length > 0 ? (
        <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default TicketList;
