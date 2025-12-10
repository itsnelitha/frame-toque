"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageCircle, Instagram, Linkedin, Music2, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {

    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      function handleScroll() {
        setScrolled(window.scrollY > 50);
      }
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />

      <section className="relative bg-slate-950/30 backdrop-blur-md py-5 px-4 sm:px-6 lg:px-8 text-center">

       {/* Pulse */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
              Contact&nbsp;
            </span>
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Us
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Hit us up anytime - we are always down to build something iconic with you.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-9 space-y-10 pb-24">

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6">

          <h3 className="text-3xl font-semibold text-green-400">Reach Us Directly</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="text-green-400 w-6 h-6" />
              <a href="mailto:frametoque@gmail.com" className="hover:text-green-400 transition">
                frametoque@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <MessageCircle className="text-green-400 w-6 h-6" />
              <a
                href="https://wa.me/94701234567"
                target="_blank"
                className="hover:text-green-400 transition"
              >
                WhatsApp: +94 70 123 4567
              </a>
            </div>
          </div>

          <h3 className="text-3xl font-semibold text-green-400 mt-10">Social Media</h3>

          <div className="flex justify-start sm:justify-between flex-wrap gap-4 pt-2">
            {[
              { href: "https://instagram.com/frame.toque", icon: <Instagram />, label: "Instagram" },
              { href: "https://linkedin.com/company/frametoque", icon: <Linkedin />, label: "LinkedIn" },
              { href: "https://tiktok.com/@ft.media", icon: <Music2 />, label: "TikTok" },
              { href: "https://t.me/FrameToque", icon: <Send />, label: "Telegram" },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                aria-label={item.label}
                target="_blank"
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 transition-colors rounded-xl flex items-center justify-center"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10">
          <h3 className="text-3xl font-semibold text-green-400 mb-6">FAQ</h3>

          <div className="space-y-6">

            <div>
              <h4 className="font-semibold text-lg">How fast do you reply?</h4>
              <p className="text-gray-400">Usually within a few hours unless we are deep in a project.</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg">What services do you offer?</h4>
              <p className="text-gray-400">Web dev, graphics, branding, short-form content, and more.</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg">Do you take urgent projects?</h4>
              <p className="text-gray-400">Yep - just DM us or WhatsApp us with your deadline.</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg">Can we collaborate long-term?</h4>
              <p className="text-gray-400">Absolutely. Many of our clients stick with us for ongoing work.</p>
            </div>

          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
