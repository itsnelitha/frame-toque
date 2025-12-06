export const metadata = {
  title: "About Us | Frame Toque",
  description:
    "Learn more about Frame Toque, our mission to empower brands with stunning web development, graphic designing, and video editing services.",
    openGraph: {
    title: "About Us | Frame Toque",
    description: "Learn more about Frame Toque, our mission to empower brands with stunning web development, graphic designing, and video editing services.",
    url: "https://frame-toque.vercel.app/about", 
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

import About from "@/components/About.jsx";

export default function AboutOut() {

  return (
    <>
    <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <About />
    </main >
    </>
  );
}