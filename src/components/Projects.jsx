"use client";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar.jsx";
import Projects from "@/components/Projects.jsx";
import Footer from "@/components/Footer.jsx";
import { Github, Globe, Youtube, Eye } from "lucide-react";

export default function ProjectsMain() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const [popupImage, setPopupImage] = useState(null);

  const projects = [
    {
      title: "Portfolio Website",
      description: "yoooooooooooooooooo",
      type: "web",
      category: "Web Dev",
      image: "/projects/smurf.webp",
      github: "#",
      live: "#",
    },
    {
      title: "Brand Poster",
      description: "yoooooooooooooooooo",
      type: "graphic",
      category: "Graphics",
      image: "/projects/smurf.webp",
    },
    {
      title: "Promo Video",
      description: "yoooooooooooooooooo",
      type: "video",
      category: "Video",
      image: "/projects/smurf.webp",
      youtube: "#",
    },
    {
      title: "Landing Page",
      description: "yoooooooooooooooooo",
      type: "web",
      category: "Web Dev",
      image: "/projects/smurf.webp",
      github: "#",
      live: "#",
    },
  ];

  return (
    <>
    <Navbar scrolled={scrolled} />
      <br/>
    <section className="min-h-screen bg-slate-950 text-white py-20 px-6 sm:px-10 lg:px-16">
             {/* Pulse */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            What We&nbsp;
          </span>
          <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
            Did
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          A quick glimpse into some of our highlighted work.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              group relative rounded-2xl overflow-hidden 
              bg-slate-800/40 backdrop-blur-md 
              border border-white/10 
              shadow-lg shadow-black/30 
              hover:shadow-green-500/20 
              hover:border-green-400/40 
              transition-all duration-300 flex flex-col
            "
          >
            {/* Category */}
            <span className="
              absolute top-3 right-3 text-xs 
              px-3 py-1 rounded-md z-20 
              bg-green-400 uppercase text-black backdrop-blur-md 
              shadow-md shadow-black/30
            ">
              {project.category}
            </span>

            {/* Image */}
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="
                  w-full h-full object-cover 
                  transition-transform duration-500 
                  group-hover:scale-110
                "
              />
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              <h3 className="text-xl font-semibold">{project.title}</h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-auto flex-wrap">

                {project.type === "web" && (
                  <>
                    <a
                      href={project.github}
                      target="_blank"
                      className="
                        bg-slate-700/50 hover:bg-slate-700 
                        px-3 py-2 rounded-lg transition 
                        flex items-center justify-center
                        border border-white/10 hover:border-white/20
                      "
                    >
                      <Github className="w-5 h-5" />
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        className="
                          bg-green-500/20 hover:bg-green-500/30 
                          px-3 py-2 rounded-lg transition 
                          flex items-center justify-center
                          border border-green-400/20 hover:border-green-400/40
                        "
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </>
                )}

                {project.type === "video" && (
                  <a
                    href={project.youtube}
                    target="_blank"
                    className="
                      bg-red-500/20 hover:bg-red-500/30 
                      px-3 py-2 rounded-lg transition 
                      flex items-center justify-center
                      border border-red-500/20 hover:border-red-500/40
                    "
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}

                {project.type === "graphic" && (
                  <button
                    onClick={() => setPopupImage(project.image)}
                    className="
                      bg-purple-500/20 hover:bg-purple-500/30 
                      px-3 py-2 rounded-lg transition 
                      flex items-center justify-center
                      border border-purple-500/20 hover:border-purple-500/40
                    "
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setPopupImage(null)}
        >
          <img
            src={popupImage}
            alt="Popup"
            className="max-h-full max-w-full rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
     <Footer />
    </>
  );
}
