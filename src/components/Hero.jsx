"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Play, Zap, Sparkles, FolderKanban } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { codeExamples, floatingCards, GraphicsDesignUI, VideoEditorUI } from "../data/CodeExamples.jsx";

import Link from "next/link";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("Web Development");

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentFloatingCard = floatingCards[activeTab];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* following mouse */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 246, 106, 0.15), transparent 40%)`,
        }}
      />

      {/* Pulse */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto text-center relative w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 text-center lg:text-left gap-6 sm:gap-8 lg:gap-12 items-center relative">
         
          <div>
            <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-xs sm:text-sm text-green-300">Simple. Unique.</span>
            </div>

            <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700 delay-100 leading-tight">
              <span className="bg-gradient-to-r from-white via-green-100 to-[#44ed15]-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
                Do it Faster
              </span>
              <span className="bg-gradient-to-b from-green-400 via-[#44ed15]-400 to-green-400 bg-clip-text text-transparent block mb-1 sm:mb-2">
                & Better
              </span>
              <span className="bg-gradient-to-r from-white via-green-100 to-[#44ed15]-100 bg-clip-text text-transparent block mb-1 sm:mb-2">
                With Us
              </span>
            </h1>
            <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-in slide-in-from-bottom duration-700 delay-200 leading-relaxed">
              We create websites, graphics, and videos that make your brand shine. Simple, fast, and crafted to grab attention.
            </p>
           
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 animate-in slide-in-from-bottom duration-700 delay-300">

                <Link
                  href="/dashboard"
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg font-semibold text-sm sm:text-base hover:scale-102 transition-transform duration-300 flex items-center justify-center"
                >
                 Start Your Project
                </Link>

                <Link
                  href="/projects"
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <div className="flex items-center justify-center w-6 h-6 sm:w-6 sm:h-6 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span>What We Did</span>
                </Link>

                 <Link
                  href="/services"
                  className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <div className="flex items-center justify-center w-6 h-6 sm:w-6 sm:h-6 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span>What We Do</span>
                </Link>

              </div>


          </div>

          <div className="relative order-2 w-full">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
              <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm rounded-lg overflow-hidden h-[280px] sm:h-[350px] lg:h-[450px] border border-white/5">
            
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300">What We Do</span>
                  </div>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </div>

                <div className="p-3 sm:p-4 relative h-full">
              
                  <div className="flex space-x-1 sm:space-x-2 mb-3 sm:mb-4 overflow-x-auto">
                    {["Web Development", "Graphics Designing", "Video Editing"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${
                          activeTab === tab
                            ? "bg-green-500/30 text-white border-green-400/20"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                        } transition-all duration-200 whitespace-nowrap`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                <div className="relative overflow-hidden flex-grow">
                  {activeTab === "Web Development" ? (
                    <SyntaxHighlighter
                      language="javascript"
                      style={nightOwl}
                      customStyle={{
                        margin: 0,
                        borderRadius: "8px",
                        fontSize: "11px",
                        lineHeight: "1.4",
                        height: "100%",
                        border: "1px solid #3c3c3c",
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        textAlign: "left",
                      }}
                    >
                      {codeExamples[activeTab]}
                    </SyntaxHighlighter>
                  ) : activeTab === "Graphics Designing" ? (
                    <GraphicsDesignUI />
                  ) : activeTab === "Video Editing" ? (
                    <VideoEditorUI />
                  ) : null}
                </div>

                </div>
              </div>
              {currentFloatingCard && (
                <div
                  className={`hidden lg:block absolute bottom-4 right-4 transform translate-x-8 translate-y-8 w-72 ${currentFloatingCard.bgColor} backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-2xl`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 ${currentFloatingCard.iconColor} flex items-center justify-center text-sm font-bold`}>
                      {currentFloatingCard.icon}
                    </div>
                    <span className={`text-sm font-medium ${currentFloatingCard.textColor}`}>
                      {currentFloatingCard.title}
                    </span>
                  </div>

                  <div className={`text-sm text-left ${currentFloatingCard.contentColor}`}>
                    {currentFloatingCard.content}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
