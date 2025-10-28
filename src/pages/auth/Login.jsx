import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!email) errs.email = "Email is required.";
    if (!password) errs.password = "Password is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      await login({ email, password });
      toast.success("Logged in");
      nav("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container-centered px-6 py-12 w-[90%] md:w-4/5 max-w-[1440px] mx-auto">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold">Login</h2>
          <form onSubmit={submit} className="mt-4 space-y-4">
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
                Login
              </button>
              <a className="text-sm text-indigo-600" href="/auth/signup">
                Sign up
              </a>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            Test user: <strong>test@example.com</strong> /{" "}
            <strong>Password123</strong>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
