"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import ServicesHome from "@/components/ServicesHome.jsx";
import SoftwareWeUse from "@/components/SoftwareWeUse.jsx";
import ProjectsHome from "@/components/ProjectsHome.jsx";
import Testimonials from "@/components/Testimonials.jsx";
import WhyChooseUs from "@/components/WhyChooseUs.jsx";
import Clients from "@/components/Clients.jsx";
import Footer from "@/components/Footer.jsx";

export default function HomeClient() {
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
      <Hero />
      <ServicesHome />
      <SoftwareWeUse />
      <ProjectsHome />
      <Testimonials />
      <Clients />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
