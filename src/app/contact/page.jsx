export const metadata = {
  title: "Contact Us | Frame Toque",
  description:
    "Get in touch with Frame Toque for inquiries about our web development, graphic designing, and video editing services. We're here to help your brand shine.",
    openGraph: {
    title: "Contact Us | Frame Toque",
    description: "Get in touch with Frame Toque for inquiries about our web development, graphic designing, and video editing services. We're here to help your brand shine.",
    url: "https://frame-toque.vercel.app/contact", 
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

import Contact from "@/components/Contact.jsx";

export default function ProjectsOut() {
  return (
    <>
    <main  className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Contact />
    </main >
    </>
  );
}
