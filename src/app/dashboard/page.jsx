export const metadata = {
  title: "Dashboard | Frame Toque",
  description: "We craft fast websites, bold graphics, and pro videos that make your brand shine.",
  openGraph: {
    title: "Dashboard | Frame Toque",
    description: "We craft fast websites, bold graphics, and pro videos that make your brand shine.",
    url: "https://frame-toque.vercel.app/dashboard", 
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

import React from 'react'
import MainPage from './MainPage'

function page() {
  return (
    <MainPage/>
  )
}

export default page