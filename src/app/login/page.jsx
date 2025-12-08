// app/login/page.jsx
"use client"; // MUST be the very first line

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const { data: session } = useSession();

  useEffect(() => {
    if (session) signOut({ redirect: false });
  }, [session]);

  const handleSignIn = async (provider) => {
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: redirectUrl });
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <Link href="/">
              <Image src="/logos/ft/name-logo.png" alt="Frame Toque" width={200} height={40} className="w-48 h-auto mx-auto mb-6" />
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">Welcome</span>
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">&nbsp;Back</span>
            </h1>
            <p className="text-gray-400 text-lg">Sign in to continue</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="flex flex-col gap-3">
              {[{provider:"google",icon:<FaGoogle/>,label:"Continue with Google"},
                {provider:"github",icon:<FaGithub/>,label:"Continue with GitHub"},
                {provider:"facebook",icon:<FaFacebookF/>,label:"Continue with Facebook"}].map(btn => (
                <button
                  key={btn.provider}
                  onClick={() => handleSignIn(btn.provider)}
                  disabled={loading}
                  className="relative w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-medium shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div>{btn.icon}</div>
                  <span>{btn.label}</span>
                  {loading && <div className="absolute right-4 w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>}
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              By continuing, you agree to our <Link href="/terms" className="text-green-400 hover:text-green-300">Terms</Link> and <Link href="/privacy" className="text-green-400 hover:text-green-300">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
