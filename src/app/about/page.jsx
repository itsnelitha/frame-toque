"use client";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar.jsx";
import About from "@/components/About.jsx";
import Footer from "@/components/Footer.jsx";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <br/><br/>
      <About />
      <Footer />
    </div>
    </>
  );
}
