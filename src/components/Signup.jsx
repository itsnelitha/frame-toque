"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add signup logic here
    setLoading(false);
  };

  const socialButtons = [
    {
      onClick: handleGoogleSignUp,
      label: "Sign up with Google",
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

  const formFields = [
    {
      label: "Name",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
      placeholder: "John Doe",
      icon: User,
      required: true,
    },
    {
      label: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      placeholder: "you@example.com",
      icon: Mail,
      required: true,
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "••••••••",
      icon: Lock,
      required: true,
      helperText: "At least 8 characters",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <div className="h-20" />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16">
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
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                Join
              </span>
              <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                &nbsp;Frame Toque
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Create your account</p>
          </div>

          {/* Signup Form Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            {/* Social Signup Buttons */}
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

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              {formFields.map((field, idx) => {
                const IconComponent = field.icon;
                return (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        required={field.required}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={field.placeholder}
                      />
                    </div>
                    {field.helperText && (
                      <p className="mt-1 text-xs text-gray-500">{field.helperText}</p>
                    )}
                  </div>
                );
              })}

              {/* Terms & Privacy Checkbox */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 rounded border-white/10 bg-white/5 text-green-500"
                />
                <label className="ml-2 text-sm text-gray-400">
                  I agree to the&nbsp;
                  <Link href="/terms" className="text-green-400 hover:text-green-300">
                    Terms
                  </Link>
                  &nbsp;and&nbsp;
                  <Link href="/privacy" className="text-green-400 hover:text-green-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-b from-green-600 to-green-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?&nbsp;
              <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold">
                Sign in
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
