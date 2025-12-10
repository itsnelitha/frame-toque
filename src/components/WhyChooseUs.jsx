"use client";

import { Check } from "lucide-react";

const whyChooseData = [
  "Creative Experts ready to boost your brand",
  "Fast & Reliable work delivered on time",
  "Customer-Focused - your satisfaction comes first",
  "End-to-End Solutions: Web, Graphics & Video",
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl sm:text-6xl font-bold text-center mb-8 leading-tight">
            <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
            Why&nbsp;
          </span>
          <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            Choose Us
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          We deliver top-notch websites, graphics, and videos that help your brand shine. Here's why our clients love working with us.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 bg-white/5 backdrop-blur-md p-4 rounded-lg hover:bg-white/10 transition duration-300"
            >
              <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <p className="text-gray-200 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
