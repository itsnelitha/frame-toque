export const metadata = {
  title: "Personal Portfoilio Websites | Frame Toque",
  description:
    "Showcase your skills, projects, and creativity with a sleek personal portfolio website. Perfect for freelancers, creators, and professionals who want to stand out online.",
    openGraph: {
    title: "Personal Portfoilio Websites | Frame Toque",
    description: "Showcase your skills, projects, and creativity with a sleek personal portfolio website. Perfect for freelancers, creators, and professionals who want to stand out online.",
    url: "https://frame-toque.vercel.app/services/web/personal", 
    siteName: "Frame Toque",
    images: [
      {
        url: "https://frame-toque.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frame Toque",
      },
    ],
    type: "website",
  },
};

import WebPersonal from "@/components/services/WebSub";

export default function personalpackages() {

  return (
    <>
    <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <WebPersonal />
    </main >
    </>
  );
}
