import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import CustomSection from "../components/common/CustomSection";

export default function Landing() {
  const features = [
    {
      image: "/unified.png",
      title: "Unified Dashboard",
      description:
        "Track, manage, and analyze all your tickets in one intuitive, easy-to-navigate interface.",
    },
    {
      image: "/secure.jpg",
      title: "Secure & Reliable",
      description:
        "Your data is safe with built-in encryption, session validation, and seamless authentication.",
    },
    {
      image: "/customizable.png",
      title: "Customizable Workflow",
      description:
        "Adapt TicketApp to your team's process — tweak forms, priorities, and statuses easily.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="container-centered px-6 pt-12 pb-8">
        {/* Hero Section */}
        <CustomSection className="relative overflow-hidden mt-8 bg-gradient-to-b from-indigo-50 to-white rounded-2xl">
          <div className="pl-4 md:pl-8 pt-10 md:pt-24">
            <h1 className="text-4xl font-extrabold text-gray-900">
              TicketApp — Multi-framework Ticket Manager
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Build, manage and track tickets with a clean, consistent UI.
              <br />
              Implementations: React, Vue, Twig.
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                to="/auth/signup"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/auth/login"
                className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="absolute -right-20 -bottom-12 w-56 h-56 rounded-full opacity-30 bg-indigo-300"></div>
          <div className="mt-4">
            <img
              src="/hero-wave.svg"
              alt="wave"
              className="w-full block"
            />
          </div>
        </CustomSection>

        {/* Features Section */}
        <CustomSection className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, i) => (
            <article
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition "
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-12 h-12 mb-3 object-contain"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </article>
          ))}
        </CustomSection>
      </main>

      <Footer />
    </div>
  );
}
