"use client"; 
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const pathname = usePathname();

   const links = [
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Our Projects" },
    { href: "/contact", label: "Contact Us" },
    { href: "/services", label: "Start Your Project", special: true },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
          <div className="flex items-center space-x-1 group cursor-pointer">
            <div>
             <Image
                src="/images/name-logo.png"
                alt="Frame Toque"
                width={200}     
                height={40}
                className="w-32 h-auto sm:w-48"
              />
            </div>
          </div>
          </Link>
          {/* Nav Links (desktop) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 active">
            {links.map((link) => {
        const isActive = pathname === link.href;

        const baseClasses = link.special
          ? "px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-b from-green-500 to-green-500 transition-transform duration-300"
          : "text-sm lg:text-base transition-colors duration-300";

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${baseClasses} ${
              !link.special && isActive
              ? "text-white font-bold" 
              : "text-gray-300 hover:text-white"
            } ${link.special ? "hover:scale-102" : ""}`}
          >
            {link.label}
          </Link>
        );
      })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
            {["about", "projects", "services", "contact"].map((link) => (
              <Link
                key={link}
                href={`${link}`}
                onClick={() => setMobileMenuIsOpen(false)}
                className="block text-gray-300 hover:text-white text-sm lg:text-base"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>
        </div>

      )}
    </nav>
  );
}
