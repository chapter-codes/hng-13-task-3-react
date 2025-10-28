import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchTickets, createTicket, updateTicket, deleteTicket } from '../services/ticketService'
import TicketCard from '../components/TicketCard'
import toast from 'react-hot-toast'


function validateTicketInput(payload){
const errs = {}
if(!payload.title || payload.title.trim().length < 3) errs.title = 'Title is required (min 3 chars)'
if(!['open','in_progress','closed'].includes(payload.status)) errs.status = 'Status must be one of: open, in_progress, closed'
if(payload.description && payload.description.length > 3000) errs.description = 'Description too long'
return errs
}


export default function Tickets(){
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    load();
  }, []);
  async function load() {
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch (e) {
      toast.error("Failed to load tickets. Please retry.");
    }
    setLoading(false);
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: "", description: "", status: "open", priority: "medium" });
    setErrors({});
    setFormOpen(true);
  }
  function openEdit(ticket) {
    setEditing(ticket);
    setForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority || "medium",
    });
    setErrors({});
    setFormOpen(true);
  }

  async function submit(e) {
    e.preventDefault();
    const validation = validateTicketInput(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;
    try {
      if (editing) {
        const updated = await updateTicket(editing.id, form);
        setTickets((ts) => ts.map((t) => (t.id === updated.id ? updated : t)));
        toast.success("Ticket updated");
      } else {
        const created = await createTicket(form);
        setTickets((ts) => [created, ...ts]);
        toast.success("Ticket created");
      }
      setFormOpen(false);
    } catch (err) {
      toast.error("Failed to save ticket");
    }
  }

  async function doDelete(ticket) {
    if (!confirm("Delete this ticket?")) return;
    try {
      await deleteTicket(ticket.id);
      setTickets((ts) => ts.filter((t) => t.id !== ticket.id));
      toast.success("Deleted");
    } catch (e) {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container-centered px-6 py-12 w-[90%] md:w-4/5 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Tickets</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={openCreate}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              New Ticket
            </button>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : tickets.length ? (
            tickets.map((t) => (
              <TicketCard
                key={t.id}
                ticket={t}
                onEdit={openEdit}
                onDelete={doDelete}
              />
            ))
          ) : (
            <div className="col-span-full">No tickets yet.</div>
          )}
        </section>
        {/* Form modal simple */}
        {formOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold">
                {editing ? "Edit Ticket" : "Create Ticket"}
              </h3>
              <form onSubmit={submit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  />
                  {errors.title && (
                    <p className="text-xs text-red-600 mt-1">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="open">open</option>
                    <option value="in_progress">in_progress</option>
                    <option value="closed">closed</option>
                  </select> 
                  {errors.status && (
                    <p className="text-xs text-red-600 mt-1">{errors.status}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded"
                    rows={4}
                  ></textarea>
                  {errors.description && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="px-3 py-1 border rounded"
                  >
                    Cancel
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}