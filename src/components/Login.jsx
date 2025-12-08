"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: redirectUrl });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result?.error) {
      router.push(redirectUrl);
    }
    setLoading(false);
  };

  const socialButtons = [
    {
      onClick: handleGoogleSignIn,
      label: "Continue with Google",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Pulse Effects */}
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-md w-full relative z-10">
          {/* Header */}
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
                Welcome
              </span>
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                &nbsp;Back
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Sign in to continue</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            {/* Social Login Buttons */}
            {socialButtons.map((button, idx) => (
              <button
                key={idx}
                onClick={button.onClick}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-6"
              >
                {button.icon}
                {button.label}
              </button>
            ))}

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-950/50 text-gray-400">Or</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-green-500" />
                  <span className="ml-2 text-gray-400">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-green-400 hover:text-green-300">
                  Forgot?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?&nbsp;
              <Link href="/signup" className="text-green-400 hover:text-green-300 font-semibold">
                Sign up
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
