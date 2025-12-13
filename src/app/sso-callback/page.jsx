"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useClerk } from "@clerk/nextjs";

function SSOCallbackContent() {
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
  <div className="text-center max-w-md w-full">
    <div className="flex items-center justify-center mb-8">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-green-500/30 rounded-full animate-ping absolute inset-0" />
        <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
    
    <div className="space-y-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-400 bg-clip-text text-transparent">
        Completing Authentication
      </h2>
      
      <p className="text-gray-300">
        Please wait while we verify your credentials...
      </p>
      
      <div className="pt-4">
        <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-green-500 to-green-400 animate-pulse rounded-full"></div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          Verifying your identity...
        </p>
      </div>
    </div>
    
    <div className="mt-12 pt-6 border-t border-slate-800">
      <p className="text-sm text-gray-400 mb-4">
        Taking longer than expected?
      </p>
      <button
        onClick={() => router.push("/signin")}
        className="px-6 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition text-white hover:scale-105 transform duration-200"
      >
        Cancel & Return to Sign In
      </button>
    </div>
    
    <div className="mt-8">
      <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-slate-900/50 px-3 py-2 rounded-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Do not close this window during authentication</span>
      </div>
    </div>
  </div>
</div>
  );
}

// Main component with Suspense boundary
export default function SSOCallback() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-500/30 rounded-full animate-ping absolute inset-0" />
            <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      }
    >
      <SSOCallbackContent />
    </Suspense>
  );
}