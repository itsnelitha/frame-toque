"use client"; 
import { useEffect, useState } from "react";
import { Github, Globe, Youtube, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsHome() {
  const [popupImage, setPopupImage] = useState(null);

  const projects = [
    {
      title: "Portfolio Website",
      description: "yoooooooooooooooooo",
      type: "web",
      category: "Web Dev",
      image: "/projects/web/sample.webp",
      github: "#",
      live: "#",
    },
    {
      title: "Brand Poster",
      description: "yoooooooooooooooooo",
      type: "graphic",
      category: "Graphics",
      image: "/projects/graphics/sample.webp",
    },
    {
      title: "Promo Video",
      description: "yoooooooooooooooooo",
      type: "video",
      category: "Video",
      image: "/projects/videos/sample.webp",
      youtube: "#",
    },
    {
      title: "Landing Page",
      description: "yoooooooooooooooooo",
      type: "web",
      category: "Web Dev",
      image: "/projects/web/sample.webp",
      github: "#",
      live: "#",
    },
  ];

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3">
          <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
            Featured&nbsp;
          </span>
          <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A quick glimpse into some of our highlighted work.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="
              absolute top-3 right-3 text-xs 
              px-3 py-1 rounded-md z-20 
              bg-green-400 uppercase text-black backdrop-blur-md 
              shadow-md shadow-black/30
            ">
              {project.category}
            </span>
            <div className="w-full aspect-square overflow-hidden">
              <Image
              width={1000}
              height={1000}
                src={project.image}
                alt={project.title}
                className="
                  w-full h-full object-cover 
                  transition-transform duration-500 
                  group-hover:scale-110
                "
              />
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <h3 className="text-xl font-semibold">{project.title}</h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-3 mt-auto flex-wrap">

                {project.type === "web" && (
                  <>
                    <Link
                      aria-label="View on GitHub"
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
                    </Link>

                    {project.live && (
                      <Link
                        aria-label="View Live Site"
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
                      </Link>
                    )}
                  </>
                )}

                {project.type === "video" && (
                  <Link
                    aria-label="Watch on YouTube"
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
                  </Link>
                )}

                {project.type === "graphic" && (
                  <button aria-label="view"
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
      </div>

      <div className="text-center mt-12">
        <Link
        aria-label="View More Projects"
          href="/projects"
         className="inline-block px-6 py-2 rounded-lg bg-gradient-to-b from-green-600 to-green-700 text-white text-lg transition"

        >
          View More →
        </Link>
      </div>

      {popupImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setPopupImage(null)}
        >
          <Image
            src={popupImage}
            alt="Popup"
            width={1000}
            height={1000}
            className="max-h-full max-w-full rounded-lg shadow-xl"
          />
        </div>
      )}
    </section>
  );
}
