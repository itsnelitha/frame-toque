"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPageWrapper() {
  return (
    <SessionProvider>
      <LoginPage />
    </SessionProvider>
  );
}

function LoginPage() {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { data: session } = useSession();

  // End previous session if user comes to /login while logged in
  useEffect(() => {
    if (session) {
      signOut({ redirect: false }).then(() => console.log("Previous session ended"));
    }
  }, [session]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = async (provider) => {
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: redirectUrl });
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const socialProviders = [
    { provider: "google", label: "Continue with Google", icon: <FaGoogle /> },
    { provider: "github", label: "Continue with GitHub", icon: <FaGithub /> },
    { provider: "facebook", label: "Continue with Facebook", icon: <FaFacebookF /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />

      <main className="flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/logos/ft/name-logo.png"
                alt="Frame Toque"
                width={200}
                height={40}
                className="mx-auto mb-6"
              />
            </Link>
            <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
            <p className="text-gray-400 text-lg">Sign in to continue</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 flex flex-col gap-3">
            {socialProviders.map((btn) => (
              <button
                key={btn.provider}
                onClick={() => handleSignIn(btn.provider)}
                disabled={loading}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-green-400">Terms</Link> and{" "}
            <Link href="/privacy" className="text-green-400">Privacy Policy</Link>.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
