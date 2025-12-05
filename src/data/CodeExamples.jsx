"use client";
import { useRef, useState } from "react";
import { Brush, Pen, Square, Play, Pause, Gauge, Sliders, Film, Filter, Layers, Music, Text, Crop, Undo } from "lucide-react";
import Image from "next/image";

export const codeExamples = {
  "Web Development": `// Frame Toque | Creative Web Development
import React from "react";

function FrameToqueApp() {
  const companyName = "Frame Toque";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
    bg-gradient-to-br from-[#3c327b] to-[#00c4ff] text-white font-sans">
      <h1 className="text-5xl font-bold mb-4">{companyName}</h1>
      <p className="text-lg mb-6 text-gray-200/80">
        Crafting clean, fast, and modern web experiences for your business.
      </p>
      <button className="bg-white text-[#3c327b] font-semibold px-6 py-3
      rounded-lg shadow-lg hover:scale-105 transition-transform">
        Get Started
      </button>
    </div>
  );
}
export default FrameToqueApp;`,
};

export function GraphicsDesignUI() {
  return (
<div className="bg-gray-900 rounded-xl p-6 w-[550px] shadow-2xl">

  <div className="flex justify-between mb-3">
    <div className="flex items-center gap-2">
      <Image 
        src="/logos/ps-logo.png" 
        alt="Photoshop Logo" 
        width={5} height={5}
        className="w-5 h-5"
      />
      <span className="font-semibold text-white text-sm">Photoshop</span>
    </div>
    <button className="px-2 py-1 bg-[#085e9c] text-white rounded hover:bg-[#001E36] transition-colors text-sm">
      Export
    </button>
  </div>

  <div className="flex gap-4 h-72">

    <div className="flex flex-col gap-2 bg-[#001E36]/20 p-2 rounded w-20 flex-shrink-0">
      <button className="flex items-center gap-1 text-white text-xs hover:text-[#b8a9ff]">
        <Brush className="w-3 h-3" /> Brush
      </button>
      <button className="flex items-center gap-1 text-white text-xs hover:text-[#b8a9ff]">
        <Pen className="w-3 h-3" /> Pencil
      </button>
      <button className="flex items-center gap-1 text-white text-xs hover:text-[#b8a9ff]">
        <Square className="w-3 h-3" /> Shape
      </button>
      <button className="flex items-center gap-1 text-white text-xs hover:text-[#b8a9ff]">
        <Filter className="w-3 h-3" /> Filter
      </button>
      <button className="flex items-center gap-1 text-white text-xs hover:text-[#b8a9ff]">
        <Layers className="w-3 h-3" /> Effects
      </button>
    </div>

    <div className="flex-1 bg-gray-800 border border-[#001E36]/50 rounded flex items-center justify-center overflow-hidden relative">
      <Image
        src="/images/smurf.webp"
        alt="Canvas Preview"
        width={1000} height={1000}
        className="object-contain h-full w-full"
      />
      <div className="absolute bottom-2 right-2 bg-[#001E36]/50 text-xs text-white px-1 py-0.5 rounded">Image</div>
    </div>

    <div className="flex flex-col gap-2 bg-[#001E36]/20 p-2 rounded w-32 flex-shrink-0">
      <span className="font-semibold text-white text-sm mb-1">Layers</span>
      <div className="bg-gray-800 p-1 rounded text-xs text-white">Background</div>
      <div className="bg-gray-800 p-1 rounded text-xs text-white">Logo</div>
      <div className="bg-gray-800 p-1 rounded text-xs text-white">Text</div>
      <div className="bg-gray-800 p-1 rounded text-xs text-white">Adjustment</div>
      <div className="bg-gray-800 p-1 rounded text-xs text-white">Effects</div>
    </div>
  </div>

  <div className="flex justify-between mt-3 text-xs">
    <button className="bg-[#001E36] text-white px-2 py-1 rounded hover:bg-[#000b2b]">Undo</button>
    <button className="bg-[#001E36] text-white px-2 py-1 rounded hover:bg-[#000b2b]">Redo</button>
    <button className="bg-[#001E36] text-white px-2 py-1 rounded hover:bg-[#000b2b]">Preview</button>
    <button className="bg-[#085e9c] text-white px-2 py-1 rounded hover:bg-[#001E36]">Apply Changes</button>
  </div>
</div>


  );
}

export function VideoEditorUI() {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 w-[550px] shadow-2xl">

      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image 
            src="/logos/pr-logo.png" 
            alt="Premier Logo" 
            width={20} height={20} 
            className="w-5 h-5"
          />
          <span className="font-semibold text-white text-sm">Premier Pro</span>
        </div>
        <button className="px-2 py-1 bg-[#00005b] text-white rounded hover:bg-[#00003a] transition-colors text-sm">
          Export
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-4">

        {/* Left Tools */}
        <div className="flex flex-col gap-2 w-32 bg-[#00005b]/20 p-3 rounded flex-shrink-0">
          <button className="flex items-center gap-2 text-white text-xs hover:text-[#5a5aff]"><Sliders className="w-3 h-3"/> Effects</button>
          <button className="flex items-center gap-2 text-white text-xs hover:text-[#5a5aff]"><Film className="w-3 h-3"/> Media</button>
          <button className="flex items-center gap-2 text-white text-xs hover:text-[#5a5aff]"><Music className="w-3 h-3"/> Audio</button>
          <button className="flex items-center gap-2 text-white text-xs hover:text-[#5a5aff]"><Text className="w-3 h-3"/> Titles</button>
          <button className="flex items-center gap-2 text-white text-xs hover:text-[#5a5aff]"><Crop className="w-3 h-3"/> Crop</button>
          <button className="flex items-center gap-2 text-white text-xs hover:text-[#5a5aff]"><Undo className="w-3 h-3"/> Undo</button>
        </div>

        {/* Video + Properties + Timeline */}
        <div className="flex-1 flex flex-col gap-3">

          {/* Video + Properties */}
          <div className="flex gap-3">

            {/* Video Box */}
            <div className="bg-gray-800 border border-[#00005b]/50 rounded overflow-hidden flex-shrink-0" style={{ width: '140px' }}>
              <div className="aspect-[9/16]">
                <video
                  ref={videoRef}
                  src="/videos/sample.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded"
                  onTimeUpdate={handleTimeUpdate}
                />
              </div>
            </div>

            {/* Properties + Timeline */}
            <div className="w-24 flex flex-col justify-between h-[240px]">

              {/* Timeline */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#00005b]/20 rounded p-2 flex flex-col gap-1 w-50">
                <span className="text-white text-xs font-semibold">Timeline</span>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 h-3 rounded overflow-hidden">
                  <div
                    className="bg-gray-800 h-3 rounded"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Time Labels */}
                <div className="flex justify-between text-xs text-white">
                  <span>00:00</span>
                  <span>-00:{videoRef.current ? String(Math.floor(videoRef.current.duration - videoRef.current.currentTime)).padStart(2, '0') : '01'}</span>
                </div>
              </div>


                {/* Buttons */}
                <div className="flex w-full gap-2">
                  <button
                    className="flex items-center gap-1 bg-[#00005b] text-white py-3 px-3 rounded hover:bg-[#00003a] transition-colors text-xs"
                    onClick={() => videoRef.current && videoRef.current.play()}
                  >
                    <Play className="w-3 h-3" /> Play
                  </button>
                  <button
                    className="flex items-center gap-1 bg-[#00005b] text-white py-3 px-3 rounded hover:bg-[#00003a] transition-colors text-xs"
                    onClick={() => videoRef.current && videoRef.current.pause()}
                  >
                    <Pause className="w-3 h-3" /> Pause
                  </button>
                  <button
                    className="flex items-center gap-1 bg-[#00005b] text-white py-3 px-3 rounded hover:bg-[#00003a] transition-colors text-xs"
                    onClick={() => {
                      if (videoRef.current) {
                        const newSpeed = speed === 1 ? 2 : 1;
                        videoRef.current.playbackRate = newSpeed;
                        setSpeed(newSpeed);
                      }
                    }}
                  >
                    <Gauge className="w-3 h-3" /> {speed}x
                  </button>
                </div>

              </div>

              {/* Properties Section */}
              <div className="flex flex-col gap-2">
                <span className="text-white text-xs font-semibold">Properties</span>
                <div className="bg-gray-800 p-1 rounded text-white text-xs">Clip Info</div>
                <div className="bg-gray-800 p-1 rounded text-white text-xs">Effects</div>
                <div className="bg-gray-800 p-1 rounded text-white text-xs">Color</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export const floatingCards = {
  "Web Development": {
    bgColor: "bg-[#3c327b]/20",
    iconColor: "text-[#3c327b]",
    textColor: "text-white",
    contentColor: "text-gray-200",
    icon: "💻",
    title: "Next-Level Websites",
    content: "qwertyuiopuiopasdfghjklzxcvbnm",
  },
  "Graphics Designing": {
    bgColor: "bg-[#3c327b]/20",
    iconColor: "text-[#3c327b]",
    textColor: "text-white",
    contentColor: "text-gray-200",
    icon: "🎨",
    title: "Creative Designs",
    content: "qwertyuiopuiopasdfghjklzxcvbnm",
  },
  "Video Editing": {
    bgColor: "bg-[#3c327b]/20",
    iconColor: "text-[#3c327b]",
    textColor: "text-white",
    contentColor: "text-gray-200",
    icon: "🎬",
    title: "Pro Videos",
    content: "qwertyuiopuiopasdfghjklzxcvbnm",
  },
};
