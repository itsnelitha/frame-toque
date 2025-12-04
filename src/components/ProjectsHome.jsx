import { Github, Globe, Youtube, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProjectsHome() {
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

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col group"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-square overflow-hidden">
              {/* Category label inside image */}
              <span className="absolute top-2 right-2 z-10 bg-green-400 uppercase text-black text-xs px-3 py-1 rounded-md">
                {project.category}
              </span>

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3 flex-1">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-gray-400 text-sm">{project.description}</p>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto flex-wrap">
                {project.type === "web" && (
                  <>
                    <a
                      href={project.github}
                      target="_blank"
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 transition rounded flex items-center gap-1"
                    >
                      <Github className="w-4 h-4 text-white" />
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 transition rounded flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </>
                )}

                {project.type === "video" && (
                  <a
                    href={project.youtube}
                    target="_blank"
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 transition rounded flex items-center gap-1"
                  >
                    <Youtube className="w-4 h-4 text-white" />
                  </a>
                )}

                {project.type === "graphic" && (
                  <button
                    onClick={() => setPopupImage(project.image)}
                    className="px-3 py-1 bg-purple-500 hover:bg-purple-600 transition rounded flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-12">
        <Link
          href="/projects"
          className="inline-block px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-lg transition"
        >
          View More →
        </Link>
      </div>

      {/* Popup */}
      {popupImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setPopupImage(null)}
        >
          <img
            src={popupImage}
            alt="Popup"
            className="max-h-full max-w-full rounded-lg shadow-xl"
          />
        </div>
      )}
    </section>
  );
}
