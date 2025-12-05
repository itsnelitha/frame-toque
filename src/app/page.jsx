"use client";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import ServicesHome from "../components/ServicesHome.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ProjectsHome from "../components/ProjectsHome.jsx";
import SoftwareWeUse from "../components/SoftwareWeUse.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";

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
      <Hero />
      <ServicesHome />
      <SoftwareWeUse />
      <ProjectsHome />
      <Testimonials />
      <WhyChooseUs />
      <Footer />
    </div>
    </>
  );
}
