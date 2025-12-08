"use client";

import { Bell, Menu, Search } from "lucide-react";

export default function DashboardHeader({ setMobileMenuOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-white/10 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-64 lg:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="sm:hidden p-2 hover:bg-white/10 rounded-lg">
            <Search className="w-5 h-5" />
          </button>

          <button className="relative p-2 hover:bg-white/10 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>

          <div className="lg:hidden w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
