"use client";
import { useEffect, useState } from "react";
import { Laptop, PenTool, Video } from "lucide-react";

const features = [
  {
    title: "Web Development",
    description:
      "yoooooooooooooooooo.",
    icon: Laptop,
    imagePosition: "left",
  },
  {
    title: "Graphics Designing",
    description:
      "yoooooooooooooooooo",
    icon: PenTool,
    imagePosition: "left",
  },
  {
    title: "Video Editing",
    description:
      "yoooooooooooooooooo",
    icon: Video,
    imagePosition: "left",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 relative">

      {/* Pulse */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              What We&nbsp;
            </span>
            <span className="bg-gradient-to-b from-green-400 to-green-400 bg-clip-text text-transparent">
              Do
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {features.map((feature, key) => {
            const Icon = feature.icon;
            return (

              <div
                key={key}
                className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${
                  feature.imagePosition === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Icon / Image Card */}
                <div className="flex-1 w-full flex justify-center lg:order-0 mb-6 lg:mb-0">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl transition-all duration-500" />
                    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-10 flex items-center justify-center group-hover:border-green-600/50 transition-all duration-300">
                      <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex-1 w-full">
                  <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                    <h3 className="text-4xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-xl sm:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>


            );
          })}
        </div>
      </div>
    </section>
  );
}
