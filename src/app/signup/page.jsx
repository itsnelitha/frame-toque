export const metadata = {
  title: "Sign Up | Frame Toque",
  description:
    "Create your Frame Toque account to get started with professional web development, graphic designing, and video editing services. Join our community today.",
  openGraph: {
    title: "Sign Up | Frame Toque",
    description: "Create your Frame Toque account to get started with professional web development, graphic designing, and video editing services.",
    url: "https://frame-toque.vercel.app/signup",
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

import Signup from "@/components/Signup.jsx";

export default function SignupPageWrapper() {
  return (
    <>
      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <Signup />
      </main>
    </>
  );
}
