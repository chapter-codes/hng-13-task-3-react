import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, logout } from "../services/authService";

export default function Header() {
  const nav = useNavigate();
  const session = getSession();
  function doLogout() {
    logout();
    nav("/");
  }
  return (
    <header className="bg-white shadow-sm">
      <div className=" px-6 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-semibold">
            TicketApp
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link to="/dashboard" className="text-sm">
                Dashboard
              </Link>
              <Link to="/tickets" className="text-sm">
                Tickets
              </Link>
              <button
                onClick={doLogout}
                className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="text-sm">
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
