export const metadata = {
  title: "Dashboard | Frame Toque",
  description:
    "Access your Frame Toque client dashboard to manage your projects, browse services, and track your orders. Your one-stop solution for web development, graphics, and video editing.",
  openGraph: {
    title: "Dashboard | Frame Toque",
    description: "Access your Frame Toque client dashboard to manage your projects, browse services, and track your orders.",
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

import DashboardHome from "@/components/dashboard/DashboardHome.jsx";

export default function DashboardPageWrapper() {
  return (
    <>
      <DashboardHome />
    </>
  );
}
