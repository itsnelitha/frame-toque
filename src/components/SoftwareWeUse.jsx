"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function SoftwareWeUse() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let speed = 0.8;
    let animation;

    const autoScroll = () => {
      slider.scrollLeft += speed;

      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }

      animation = requestAnimationFrame(autoScroll);
    };

    animation = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animation);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const startDrag = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      slider.classList.remove("cursor-grab");

      startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDrag = () => {
      isDown = false;
      slider.classList.add("cursor-grab");
      slider.classList.remove("cursor-grabbing");
    };

    const moveDrag = (e) => {
      if (!isDown) return;

      e.preventDefault();
      const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
      const walk = (x - startX) * 1.2; 
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("mouseleave", stopDrag);
    slider.addEventListener("mouseup", stopDrag);
    slider.addEventListener("mousemove", moveDrag);

    slider.addEventListener("touchstart", startDrag);
    slider.addEventListener("touchend", stopDrag);
    slider.addEventListener("touchmove", moveDrag);

    return () => {
      slider.removeEventListener("mousedown", startDrag);
      slider.removeEventListener("mouseleave", stopDrag);
      slider.removeEventListener("mouseup", stopDrag);
      slider.removeEventListener("mousemove", moveDrag);

      slider.removeEventListener("touchstart", startDrag);
      slider.removeEventListener("touchend", stopDrag);
      slider.removeEventListener("touchmove", moveDrag);
    };
  }, []);

  const tools = [
    { name: "Adobe Photoshop", img: "/logos/ps-logo.png" },
    { name: "Adobe Premier Pro", img: "/logos/pr-logo.png" },
    { name: "Final Cut Pro", img: "/logos/finalcut-logo.png" },
    { name: "Davinci Resolve", img: "/logos/davinci-logo.png" },
    { name: "Adobe After Effects", img: "/logos/aftereffects-logo.png" },
    { name: "Capcut", img: "/logos/capcut-logo.png" },
    { name: "Visual Studio Code", img: "/logos/vscode-logo.png" },
    { name: "Figma", img: "/logos/figma-logo.png" },
    { name: "GitHub", img: "/logos/github-logo.png" },
  ];

  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3">
          <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
            Software&nbsp;
          </span>
          <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            We Use
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Tools that power our workflow.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-slate-950 to-transparent z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-slate-950 to-transparent z-20"></div>

        <div
          ref={sliderRef}
          className="
            flex gap-8 py-4 
            overflow-hidden 
            select-none 
            cursor-grab
          "
        >
          {tools.concat(tools).map((tool, i) => (
            <div
              key={i}
              className="
                min-w-[200px]
                shrink-0
                bg-slate-900/70
                border border-slate-800
                rounded-2xl
                px-8 py-6
                flex flex-col items-center
                hover:bg-slate-900
                transition
              "
            >
              <Image
                src={tool.img}
                width={70}
                height={70}
                alt={tool.name}
                className="object-contain"
              />
              <p className="mt-3 text-lg font-medium text-white">
                {tool.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
