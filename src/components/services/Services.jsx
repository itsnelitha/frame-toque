"use client";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import { Check, Star } from "lucide-react";
import Link from "next/link";

import WebSub from "@/components/services/WebSub";

const pricingCategories = [
  {
    category: "Graphics Designing",
    plans: [
      {
        name: "Basic",
        price: "10",
        description: "For personal videos",
        features: ["Simple Caption Style", "Correct Alignment", "Background Music", "Basic Color Correction", <>2 Revisions <i>(Each Extra Revision: $0.65)</i></>],
        mostPopular: false,
      },
      {
        name: "Standard",
        price: "15",
        description: "For content creators",
        features: ["Advanced Annimations", "Trendy Viral Caption Style", "Sound Effects", "Background Music", "Cinematic Color Grading", <>3 Revisions <i>(Each Extra Revision: $0.65)</i></>],
        mostPopular: true,
      },
      {
        name: "Premium",
        price: "25",
        description: "For production studios",
        features: ["Advanced VFX Annimations", "Masking", "Separate Annimated B-Roll", "Cinematic Color Grading", "Trendy Animated Caption Style", <>5 Revisions <i>(Each Extra Revision: $0.65)</i></>],
        mostPopular: false,
      },
    ],
  },
  {
    category: "Video Editing",
    plans: [
      {
        name: "Basic",
        price: "10",
        description: "For personal videos",
        features: ["Simple Caption Style", "Correct Alignment", "Background Music", "Basic Color Correction", <>2 Revisions <i>(Each Extra Revision: $0.65)</i></>],
        mostPopular: false,
      },
      {
        name: "Standard",
        price: "15",
        description: "For content creators",
        features: ["Advanced Annimations", "Trendy Viral Caption Style", "Sound Effects", "Background Music", "Cinematic Color Grading", <>3 Revisions <i>(Each Extra Revision: $0.65)</i></>],
        mostPopular: true,
      },
      {
        name: "Premium",
        price: "25",
        description: "For production studios",
        features: ["Advanced VFX Annimations", "Masking", "Separate Annimated B-Roll", "Cinematic Color Grading", "Trendy Animated Caption Style", <>5 Revisions <i>(Each Extra Revision: $0.65)</i></>],
        mostPopular: false,
      },
    ],
  },
];

export default function ServicesMain() {

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

    <section className="py-16 sm:py-20 px-6 lg:px-8">


      
      <WebSub />
      <br /><br />

      <div className="max-w-7xl mx-auto space-y-16">
        {pricingCategories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
              {category.category}
            </h2>
            <br/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
              {category.plans.map((plan, key) => (
                <div
                  key={key}
                  className={`relative bg-slate-900/50 backdrop-blur-sm border rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 overflow-visible group flex flex-col h-full ${
                    plan.mostPopular
                      ? "border-green-500 shadow-2xl shadow-green-500/20 lg:scale-105"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none rounded-lg" />

                  {plan.mostPopular && (
                    <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="flex items-center space-x-1 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-b from-green-500 to-green-500 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                        <Star className="w-3 h-3 sm:w-3 sm:h-3 fill-white" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-400 bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-row">
                    {plan.features.map((feature, featureKey) => (
                      <li key={featureKey} className="flex items-start space-x-2 sm:space-x-3">
                        <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard"
                    className={`text-center w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 mt-auto hover:scale-102 cursor-pointer text-sm sm:text-base ${
                      plan.mostPopular
                        ? "bg-gradient-to-b from-green-500 to-green-500"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-gray-400 text-base text-xl">
            Need a custom plan? &nbsp;
            <a href="/contact" className="text-green-600 hover:text-green-500 font-semibold">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </section>
        </>
  );
}