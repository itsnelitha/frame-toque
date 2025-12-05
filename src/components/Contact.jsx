"use client";

import { useState } from "react";
import { Send, Music2, Linkedin, Instagram, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
<br /> <br /><br /> <br />
      <section className="relative bg-slate-950/30 backdrop-blur-md py-5 px-4 sm:px-6 lg:px-8 text-center">

       {/* Pulse */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
            Contact&nbsp;
          </span>
          <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            Us
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Get in touch with Frame Toque today and watch your brand grow.
        </p>
      </div>

      </section>

      <section className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 flex flex-col space-y-4 shadow-2xl border border-white/10"
        >
          {submitted && (
            <p className="text-green-400 text-sm sm:text-base font-medium animate-pulse">
              Your message has been sent.
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-b from-green-600 to-green-400 text-white px-6 py-3 rounded-xl font-semibold hover:scale-102 transition-transform duration-300 flex items-center justify-center space-x-2"
          >
            <span>Send Message</span>
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 flex justify-center space-x-4 sm:space-x-6">
          {[ 
            { href: "https://tg.me/frametoque", icon: <Send /> },
            { href: "https://tiktok.com/frametoque", icon: <Music2 /> },
            { href: "https://linkedin.com/company/frametoque", icon: <Linkedin /> },
            { href: "https://instagram.com/frame.toque", icon: <Instagram /> },
            { href: "mailto:frametoque@gmail.com", icon: <Mail /> }
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              className="p-3 bg-slate-800/50 hover:bg-slate-700/50 transition-colors rounded-xl flex items-center justify-center"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </section>
<br /><br />
      <Footer />
    </div>
  );
}
