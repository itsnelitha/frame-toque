"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function SSOCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleRedirectCallback } = useClerk();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const errorParam = searchParams.get("error");
        if (errorParam) {
          throw new Error(decodeURIComponent(errorParam));
        }

        await handleRedirectCallback({
          onSuccess: () => {
            console.log("SSO authentication successful");
            router.push("/dashboard");
          },
          onComplete: () => {
            console.log("SSO authentication complete");
            router.push("/dashboard");
          },
          onError: (err) => {
            console.error("SSO callback error:", err);
            setError(err.message || "Authentication failed");
            setTimeout(() => {
              router.push("/signin?error=" + encodeURIComponent(err.message || "Authentication failed"));
            }, 2000);
          }
        });
      } catch (err) {
        console.error("Authentication error:", err);
        setError(err.message || "Authentication failed");
        
        setTimeout(() => {
          router.push("/signin?error=" + encodeURIComponent(err.message || "Authentication failed. Please try again."));
        }, 2000);
      }
    };

    const timer = setTimeout(() => {
      handleAuthCallback();
    }, 100);

    return () => clearTimeout(timer);
  }, [handleRedirectCallback, router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-red-400">Authentication Error</h2>
          <p className="text-gray-400 mb-6 max-w-md">{error}</p>
          <button
            onClick={() => router.push("/signin")}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
          >
            Return to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <div className="text-center">
       <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-green-500/30 rounded-full animate-ping absolute inset-0" />
                <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-2 bg-gradient-to-r from-green-400 to-green-400 bg-clip-text text-transparent">
          Completing Authentication
        </h2>
        
        <p className="text-gray-400 max-w-md mx-auto">
          Please wait while we verify your credentials...
        </p>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">
            This should only take a moment.
          </p>
          <button
            onClick={() => router.push("/signin")}
            className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition text-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}