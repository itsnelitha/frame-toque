import Image from "next/image";
import { Calendar, Eye, MoreVertical } from "lucide-react";

export default function ProjectCard({ project }) {
  const statusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    review: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  const typeColors = {
    web: "bg-blue-500",
    graphics: "bg-purple-500",
    video: "bg-red-500",
  };

  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 flex flex-col h-full">
      {/* Project Image */}
      <div className="relative h-48 bg-slate-800 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 ${typeColors[project.type]} text-white text-xs font-semibold rounded-full uppercase`}>
            {project.type}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {project.title}
          </h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
            {project.status.replace("-", " ")}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{project.date}</span>
          </div>
          
          <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
