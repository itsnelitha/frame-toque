export const metadata = {
  title: "Our Services | Frame Toque",
  description:
    "Explore our range of services including web development, graphic designing, and video editing tailored to make your brand shine.",
    openGraph: {
    title: "Our Services | Frame Toque",
    description: "Explore our range of services including web development, graphic designing, and video editing tailored to make your brand shine.",
    url: "https://frametoque.online/services", 
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

import Services from "@/components/services/Services.jsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {


  return (
    <>
    <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
          <Navbar />
      <br/> <br/> <br/> <br/>

                   {/* Pulse */}
            <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#44ed15]-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                  Our&nbsp;
                </span>
                <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                From websites to videos, we make your brand look amazing everywhere.
              </p>
            </div>

      <Services />
      <Footer/>
    </main >
    </>
  );
}
