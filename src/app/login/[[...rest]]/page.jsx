"use client";

import { useState, useEffect } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CustomLogin({ scrolled }) {
  const { isLoaded, signIn } = useSignIn();
  const { isSignedIn, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for redirect error
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMsg(decodeURIComponent(error));
    }
  }, [searchParams]);

  // Redirect if already signed in
  useEffect(() => {
    if (userLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [userLoaded, isSignedIn, router]);

  const socialProviders = [
    { provider: "oauth_google", label: "Continue with Google", icon: <FcGoogle size={20} /> },
    { provider: "oauth_apple", label: "Continue with Apple", icon: <FaApple size={20} />, disabled: true },
    { provider: "oauth_github", label: "Continue with Github", icon: <FaGithub size={20} /> },
  ];

  async function handleSignIn(provider) {
    if (!isLoaded || loading) return;
    setLoading(true);
    setErrorMsg("");
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setErrorMsg(err.errors?.[0]?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  // Only show loading if already signed in (redirecting)
  if (userLoaded && isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-10">
            <Link href="/">
              <Image
                src="/logos/ft/name-logo.png"
                alt="Frame Toque"
                width={200}
                height={40}
                className="w-48 h-auto mx-auto mb-8 opacity-90 hover:opacity-100 transition"
              />
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                Welcome
              </span>
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                &nbsp;Back
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Sign in to access your dashboard and continue your projects.
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            {errorMsg && (
              <div className="text-red-400 bg-red-400/10 p-3 rounded-lg text-sm mb-4 text-center animate-pulse">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {socialProviders.map((btn) => (
                <button
                  key={btn.provider}
                  onClick={() => handleSignIn(btn.provider)}
                  disabled={btn.disabled || loading}
                  className={`relative w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-gray-100 rounded-lg font-medium shadow-sm hover:bg-white/20 transition-all duration-200 ${
                    btn.disabled || loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && !btn.disabled ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <div className="flex-shrink-0">{btn.icon}</div>
                      <span>{btn.label}</span>
                    </>
                  )}
                </button>
              ))}
            </div>

            <div className="my-6 border-t border-white/10"></div>

            <p className="text-center text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-green-400 hover:text-green-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-400 hover:text-green-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}