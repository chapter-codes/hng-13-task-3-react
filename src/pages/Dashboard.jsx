import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchTickets } from "../services/ticketService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

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

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container-centered px-6 py-12 w-[90%] md:w-4/5 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Link
            to="/tickets"
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Manage Tickets
          </Link>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            Total tickets <div className="text-3xl font-bold mt-4">{total}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            Open tickets <div className="text-3xl font-bold mt-4">{open}</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            Resolved <div className="text-3xl font-bold mt-4">{resolved}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
