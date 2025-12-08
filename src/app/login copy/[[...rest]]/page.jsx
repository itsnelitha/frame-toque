"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CustomLogin() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSocialSignIn(provider) {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({ strategy: provider });
    } catch (err) {
      setErrorMsg(err.errors?.[0]?.message || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h1>

        {errorMsg && (
          <p className="text-red-400 bg-red-400/10 p-2 rounded-lg text-sm mb-4">
            {errorMsg}
          </p>
        )}

        {/* SOCIAL LOGIN BUTTONS */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/20 transition"
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialSignIn("facebook")}
            className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/20 transition"
          >
            <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
