"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const webcatprices = [

  {
    key: "personal",
    title: "Personal Portfolio Website",
    desc: "Perfect for creators, freelancers, and professionals who want a clean digital identity.",
    price: "299",
    plans: [
      {
        name: "Standard",
        description: "Beginner-friendly clean portfolio",
        price: "99",
        mostPopular: false,
        features: [
          "Up to 5 Pages",
          "Responsive Design",
          "Basic Animations",
          "Contact Form",
          "Social Media Links",
          "Basic SEO",
          "2 Revisions",
        ],
      },
      {
        name: "Modern UI",
        description: "Smooth, aesthetic, upgraded UI",
        price: "149",
        mostPopular: true,
        features: [
          "Everything in Standard",
          "Modern Animations",
          "Micro Interactions",
          "Light/Dark Mode",
          "Enhanced Portfolio Grid",
          "SEO Meta Structure",
          "3 Revisions",
        ],
      },
      {
        name: "Fully Custom",
        description: "Custom UI/UX built from scratch",
        price: "249",
        mostPopular: false,
        features: [
          "Fully Original Layout",
          "Unlimited Pages",
          "Custom Components",
          "Optional Backend",
          "Blog/Gallery Integration",
          "Priority Support",
          "Unlimited Revisions",
        ],
      },
    ],
  },

  {
    key: "business",
    title: "Startup / Company Website",
    desc: "Perfect for small businesses and startups needing a clean online presence.",
    price: "299",
    plans: [
      {
        name: "Standard Corporate",
        description: "Professional business layout",
        price: "149",
        mostPopular: false,
        features: [
          "Up to 8 Pages",
          "Responsive UI",
          "Team & Services Pages",
          "Contact + Inquiry Forms",
          "Google Maps",
          "Basic SEO",
          "2 Revisions",
        ],
      },

      {
        name: "Modern Business UI",
        description: "High-end UI with motion + structure",
        price: "249",
        mostPopular: true,
        features: [
          "Everything in Standard Corporate",
          "Custom Hero Sections",
          "Card Layouts",
          "Smooth Animations",
          "Integrated Blog",
          "Analytics Setup",
          "SEO Structured Data",
          "3 Revisions",
        ],
      },

      {
        name: "Fully Custom Enterprise",
        description: "Premium brand-level design",
        price: "399",
        mostPopular: false,
        features: [
          "Full Brand-Based Custom Design",
          "CRM / Backend Integration",
          "Employee Dashboard (Optional)",
          "Blog + News System",
          "Complete SEO Optimization",
          "Advanced Motion Effects",
          "Unlimited Revisions",
        ],
      },
    ],
  },

  {
    key: "ecommerce",
    title: "E-Commerce Online Store",
    desc: "Sell products online with a smooth, modern shopping experience and showcase your products with style.",
    price: "399",
    plans: [
      {
        name: "Catalogue Only",
        description: "Show products without checkout",
        price: "199",
        mostPopular: false,
        features: [
          "Product Gallery",
          "Categories",
          "Product Detail Pages",
          "Inquiry Button",
          "Up to 50 Products",
          "2 Revisions",
        ],
      },
      {
        name: "WooCommerce Store",
        description: "WooCommerce powered shop",
        price: "299",
        mostPopular: true,
        features: [
          "WooCommerce Setup",
          "Add to Cart + Checkout",
          "Payment Gateways",
          "Coupons",
          "Shipping Zones",
          "Theme Customization",
          "100+ Products",
          "3 Revisions",
        ],
      },
      {
        name: "Custom-Coded Store",
        description: "Premium handmade e-commerce",
        price: "499",
        mostPopular: false,
        features: [
          "Full Custom Frontend",
          "Custom Backend",
          "Admin Dashboard",
          "Unlimited Products",
          "Search + Filters",
          "Order Tracking",
          "Email Notifications",
          "Full SEO Setup",
          "Priority Support",
        ],
      },
    ],
  },

  {
    key: "lms",
    title: "Learning Management System",
    desc: "Modern LMS platforms for schools, tutors, and academies.",
    price: "399",
    plans: [
      {
        name: "Basic LMS",
        description: "For small institutes",
        price: "249",
        mostPopular: false,
        features: [
          "Course Listing",
          "Student Login",
          "Trainer Profiles",
          "Video Upload/Embed",
          "Assignments",
          "Basic Reports",
          "Payments (Optional)",
          "2 Revisions",
        ],
      },
      {
        name: "Advanced LMS",
        description: "For professional academies",
        price: "349",
        mostPopular: true,
        features: [
          "Everything in Basic LMS",
          "Multi-Teacher System",
          "Live Classes (Zoom/Meet)",
          "Progress Tracking",
          "Quizzes + Exams",
          "Certificates",
          "Student Dashboard",
          "Parent Dashboard",
          "Admin Analytics",
          "4 Revisions",
        ],
      },
      {
        name: "Custom LMS",
        description: "Full-scale institutional LMS",
        price: "599",
        mostPopular: false,
        features: [
          "Fully Custom UI/UX",
          "Institution Roles",
          "Attendance Tracking",
          "Advanced Exam Module",
          "Automated Certificates",
          "AI Recommendations (Optional)",
          "Multi-Campus Support",
          "Deep Analytics Dashboard",
          "Unlimited Revisions",
        ],
      },
    ],
  },
];


export default function WebPackages() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const popupRef = useRef(null);

  const selectedCategory =
    webcatprices.find((c) => c.key === activeCategory) || null;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEsc(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <section className="py-2 px-6 relative max-w-7xl mx-auto text-white">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Web Developing</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {webcatprices.map((cat, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-2xl font-bold">{cat.title}</h3>
              <p className="text-gray-400 text-sm mt-2 mb-6">{cat.desc}</p>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-green-400">
                  ${cat.price}
                </span>
                <div className="text-gray-400 text-sm">onwards</div>
              </div>

              <button
                onClick={() => {
                  setActiveCategory(cat.key);
                  setOpen(true);
                }}
                className="mt-auto py-3 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                Get Started
              </button>
            </div>
          ))}

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300 flex flex-col">
            <h3 className="text-2xl font-bold">Is Your Category Not Listed?</h3>
            <p className="text-gray-400 text-sm mt-2 mb-6">
              Don’t worry. connect with us for a custom quote.
            </p>

            <Link
              href="/contact"
              className="mt-auto py-3 px-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Popup */}
      {open && selectedCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div
            ref={popupRef}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-6xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-4xl font-bold mb-2">
              {selectedCategory.title}
            </h2>
            <p className="text-gray-400 mb-10">{selectedCategory.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
              {selectedCategory.plans.map((plan, key) => (
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
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {plan.name}
                    </h3>
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
                      <li
                        key={featureKey}
                        className="flex items-start space-x-2 sm:space-x-3"
                      >
                        <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm sm:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/dashboard"
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
        </div>
      )}
    </>
  );
}
