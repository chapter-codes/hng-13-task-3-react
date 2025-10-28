const TICKETS_KEY = "ticketapp_tickets";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeAll(t) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(t));
}
function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchTickets() {
  await delay();
  // random failure 5%
  if (Math.random() < 0.05) {
    const e = new Error("Failed to load tickets");
    e.code = "NETWORK_ERROR";
    throw e;
  }
  return readAll();
}

export async function createTicket(payload) {
  await delay();
  const tickets = readAll();
  const newT = {
    id: "t_" + Date.now(),
    title: payload.title,
    description: payload.description || "",
    status: payload.status,
    priority: payload.priority || "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: payload.createdBy || "u_1",
  };
  tickets.unshift(newT);
  writeAll(tickets);
  return newT;
}

export async function updateTicket(id, patch) {
  await delay();
  const tickets = readAll();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  tickets[idx] = {
    ...tickets[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeAll(tickets);
  return tickets[idx];
}

export async function deleteTicket(id) {
  await delay();
}
