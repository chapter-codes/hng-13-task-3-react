import React from "react";

const statusClass = (s) => {
  if (s === "open") return "bg-status-open/10 text-status-open";
  if (s === "in_progress")
    return "bg-status-in_progress/10 text-status-in_progress";
  return "bg-status-closed/10 text-status-closed";
};

export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <article className="bg-white rounded-2xl shadow p-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{ticket.title}</h3>
          <p className="mt-2 text-sm text-gray-600">
            {ticket.description || "No description"}
          </p>
          <div className={`mt-3 text-xs inline-flex items-center gap-2 py-1 px-6 rounded-full ${ticket.status =='open'?'text-status-open bg-status-open/10':ticket.status =='closed'? 'bg-status-closed/10 text-status-closed': ' text-status-in_progress bg-sratus-in_progress/10'} ${statusClass(ticket.status)}`}>
            <span className="capitalize  whitespace-nowrap">
              {ticket.status.replace("_", " ")}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(ticket)}
            className="text-sm px-3 py-1 rounded bg-indigo-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(ticket)}
            className="text-sm px-3 py-1 rounded bg-red-50 text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}



