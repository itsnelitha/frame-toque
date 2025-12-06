export const metadata = {
  title: "Our Services | Frame Toque",
  description:
    "Explore our range of services including web development, graphic designing, and video editing tailored to make your brand shine.",
    openGraph: {
    title: "Our Services | Frame Toque",
    description: "Explore our range of services including web development, graphic designing, and video editing tailored to make your brand shine.",
    url: "https://frame-toque.vercel.app/services", 
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

import Services from "@/components/Services.jsx";

export default function Home() {


  return (
    <>
    <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Services />
    </main >
    </>
  );
}
