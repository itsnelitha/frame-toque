export const metadata = {
  title: "Login | Frame Toque",
  description:
    "Sign in to your Frame Toque account to access our web development, graphic designing, and video editing services. Manage your projects and collaborate with our team.",
  openGraph: {
    title: "Login | Frame Toque",
    description: "Sign in to your Frame Toque account to access our web development, graphic designing, and video editing services.",
    url: "https://frame-toque.vercel.app/login",
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

import { Suspense } from "react";
import Login from "@/components/Login.jsx";

function LoginFallback() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default function LoginPageWrapper() {
  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <Suspense fallback={<LoginFallback />}>
          <Login />
        </Suspense>
      </main>
    </>
  );
}
