"use client";

import { useState } from "react";
import { Check, Send, Star } from "lucide-react";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const pricingCategories = [
    {
      category: "Web Development",
      plans: [
        {
          name: "Basic",
          price: "10",
          description: "For personal videos",
          features: ["Simple Caption Style", "Correct Alignment", "Background Music", "Basic Color Correction", "2 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: false,
        },
        {
          name: "Standard",
          price: "15",
          description: "For content creators",
          features: ["Advanced Annimations", "Trendy Viral Caption Style", "Sound Effects", "Background Music", "Cinematic Color Grading", "3 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: true,
        },
        {
          name: "Premium",
          price: "25",
          description: "For production studios",
          features: ["Advanced VFX Annimations", "Masking", "Separate Annimated B-Roll", "Cinematic Color Grading", "Trendy Animated Caption Style", "5 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: false,
        },
      ],
    },
    {
      category: "Graphics Designing",
      plans: [
        {
          name: "Basic",
          price: "10",
          description: "For personal videos",
          features: ["Simple Caption Style", "Correct Alignment", "Background Music", "Basic Color Correction", "2 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: false,
        },
        {
          name: "Standard",
          price: "15",
          description: "For content creators",
          features: ["Advanced Annimations", "Trendy Viral Caption Style", "Sound Effects", "Background Music", "Cinematic Color Grading", "3 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: true,
        },
        {
          name: "Premium",
          price: "25",
          description: "For production studios",
          features: ["Advanced VFX Annimations", "Masking", "Separate Annimated B-Roll", "Cinematic Color Grading", "Trendy Animated Caption Style", "5 Revisions (Each Extra Revision: $0.65)"],
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
          features: ["Simple Caption Style", "Correct Alignment", "Background Music", "Basic Color Correction", "2 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: false,
        },
        {
          name: "Standard",
          price: "15",
          description: "For content creators",
          features: ["Advanced Annimations", "Trendy Viral Caption Style", "Sound Effects", "Background Music", "Cinematic Color Grading", "3 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: true,
        },
        {
          name: "Premium",
          price: "25",
          description: "For production studios",
          features: ["Advanced VFX Annimations", "Masking", "Separate Annimated B-Roll", "Cinematic Color Grading", "Trendy Animated Caption Style", "5 Revisions (Each Extra Revision: $0.65)"],
          mostPopular: false,
        },
      ],
    },
  ];

  const handleRequestService = (category, plan) => {
    setSelectedService({ category, plan });
    setShowRequestForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our{" "}
          </span>
          <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          From websites to videos, we make your brand look amazing everywhere.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-16">
        {pricingCategories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
              {category.category}
            </h2>

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

                  <button
                    onClick={() => handleRequestService(category.category, plan)}
                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold transition-opacity mt-auto cursor-pointer text-sm sm:text-base ${
                      plan.mostPopular
                        ? "bg-gradient-to-b from-green-500 to-green-500 hover:opacity-90"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Request Service
                  </button>
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

      {/* Request Form Modal */}
      {showRequestForm && selectedService && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRequestForm(false)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Request {selectedService.category} - {selectedService.plan.name}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Company Website Redesign"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={`$${selectedService.plan.price}`}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Any specific requirements or preferences..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-6 py-3 bg-white/10 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
