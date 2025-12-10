"use client";

import { useState, useEffect } from "react";
import { useSignUp, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CustomSignUp({ scrolled }) {
  const { isLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Clear session on visit
  useEffect(() => {
    if (clerk) clerk.signOut().catch(() => {});
  }, [clerk]);

  const socialProviders = [
    { provider: "oauth_google", label: "Sign up with Google", icon: <FcGoogle size={20} /> },
    { provider: "oauth_apple", label: "Sign up with Apple (Coming Soon)", icon: <FaApple size={20} /> },
    { provider: "oauth_github", label: "Sign up with Github", icon: <FaGithub size={20} /> },
  ];

  async function handleSocialSignUp(provider) {
    if (!isLoaded) return;
    setLoading(true);
    setErrorMsg("");
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/dashboard",
      });
    } catch (err) {
      setErrorMsg(err.errors?.[0]?.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/logos/ft/name-logo.png"
                alt="Frame Toque"
                width={200}
                height={40}
                className="w-48 h-auto mx-auto mb-6"
              />
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                Create
              </span>
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                &nbsp;Account
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Sign up to get started</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <div id="clerk-captcha" style={{ display: "none" }}></div>
            {errorMsg && (
              <p className="text-red-400 bg-red-400/10 p-2 rounded-lg text-sm mb-4 text-center">
                {errorMsg}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {socialProviders.map((btn) => (
                <button
                  key={btn.provider}
                  onClick={() => handleSocialSignUp(btn.provider)}
                  disabled={loading}
                  className="relative w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-gray-100 rounded-lg font-medium shadow-sm hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex-shrink-0">{btn.icon}</div>
                  <span>{btn.label}</span>
                  {loading && (
                    <div className="absolute right-4">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="my-6 border-t border-white/10"></div>

            <p className="text-center text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-green-400 hover:text-green-300">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-400 hover:text-green-300">
                Privacy Policy
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-gray-400 hover:text-white text-sm">
              Already have an account? Sign In →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
