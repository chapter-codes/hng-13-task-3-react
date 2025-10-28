import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { toast } from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!name) errs.name = "Name required";
    if (!email) errs.email = "Email required";
    if (!password || password.length < 8)
      errs.password = "Password must be at least 8 chars";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await signup({ name, email, password });
      toast.success("Account created");
      nav("/dashboard");
    } catch (e) {
      toast.error("Failed to signup");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container-centered px-6 py-12">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold">Create account</h2>
          <form onSubmit={submit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">
                Create account
              </button>
              <a className="text-sm text-indigo-600" href="/auth/login">
                Login
              </a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
