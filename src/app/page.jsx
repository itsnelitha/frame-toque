export const metadata = {
  title: "Frame Toque",
  description: "We craft fast websites, bold graphics, and pro videos that make your brand shine.",
  openGraph: {
    title: "Frame Toque",
    description: "We craft fast websites, bold graphics, and pro videos that make your brand shine.",
    url: "https://frame-toque.vercel.app/", 
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


import HomeClient from "./home/page.jsx";

export default function Page() {
  return <HomeClient />;
}
