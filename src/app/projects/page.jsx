export const metadata = {
  title: "Our Projects | Frame Toque",
  description:
    "Discover Frame Toque's portfolio showcasing our expertise in web development, graphic designing, and video editing services that elevate brands.",
    openGraph: {
    title: "Our Projects | Frame Toque",
    description: "Discover Frame Toque's portfolio showcasing our expertise in web development, graphic designing, and video editing services that elevate brands.",
    url: "https://frametoque.online/projects", 
    siteName: "Frame Toque",
    images: [
      {
        url: "https://frametoque.online/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frame Toque",
      },
    ],
    type: "website",
  },
};

import Projects from "@/components/Projects.jsx";

export default function ProjectsOut() {
  return (
    <>
    <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Projects />
    </main >
    </>
  );
}
