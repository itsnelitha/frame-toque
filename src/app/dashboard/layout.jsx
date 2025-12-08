"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { 
  Bell, Menu, Search, LayoutDashboard, ClipboardList, Briefcase, 
  Settings, LogOut, X, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ------------------ Sidebar ------------------
  const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { user, isLoaded } = useUser(); // <-- use isLoaded to safely render user info

    const links = [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Requests", href: "/dashboard/requests", icon: ClipboardList },
      { name: "Services", href: "/dashboard/services", icon: Briefcase },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    const isActive = (href) => {
      if (href === "/dashboard") return pathname === href;
      return pathname.startsWith(href);
    };

    return (
      <>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-50 transition-all duration-300
            ${collapsed ? "w-20" : "w-64"} 
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              {!collapsed && (
                <Link href="/">
                  <Image
                    src="/logos/ft/name-logo.png"
                    alt="Frame Toque"
                    width={150}
                    height={30}
                    className="h-8 w-auto"
                  />
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:block p-2 hover:bg-white/10 rounded-lg"
              >
                {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {links.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${active ? "bg-gradient-to-r from-green-600 to-green-700 text-white" : "text-gray-300 hover:bg-white/5"}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div className={`flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-3 ${collapsed ? "justify-center" : ""}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden">
            
{isLoaded && user?.imageUrl && (
  <img
    src={user.imageUrl}
    alt={user.fullName || "User"}
    className="object-cover w-full h-full"
  />
)}

                
                </div>

                {!collapsed && user && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-400 truncate">{user.emailAddresses[0]?.emailAddress}</p>
                  </div>
                )}
              </div>

              {/* Clerk sign out button */}
              <SignOutButton redirectUrl="/login">
                <button
                  className={`flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-lg ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                  {!collapsed && <span className="font-medium">Logout</span>}
                </button>
              </SignOutButton>

            </div>
          </div>
        </aside>
      </>
    );
  };

  // ------------------ Header ------------------
  const Header = ({ setMobileMenuOpen }) => {
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
  };

  // ------------------ Layout ------------------
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="lg:pl-64 transition-all duration-300">
        <Header setMobileMenuOpen={setMobileMenuOpen} />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
