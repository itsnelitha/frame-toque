"use client";

import { useState, useEffect, useCallback } from "react";
import { useSignIn, useSignUp, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UnifiedAuth({ scrolled }) {
  const [isLogin, setIsLogin] = useState(true); 
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingProvider, setPendingProvider] = useState(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Optimized cookie check - runs only once on mount
  useEffect(() => {
    const checkPreviousAuth = () => {
      // Faster cookie check using RegExp
      const cookieString = document.cookie;
      const hasAuthCookies = /__clerk|__session/i.test(cookieString);
      
      // Faster localStorage check
      let hasLocalStorageTokens = false;
      try {
        const clerkJwt = localStorage.getItem('clerk-db-jwt');
        hasLocalStorageTokens = !!clerkJwt && clerkJwt !== 'null' && clerkJwt !== 'undefined';
      } catch (e) {
        // localStorage might be blocked
      }
      
      const isFirstVisit = localStorage.getItem('ft_first_visit') === null;
      
      if (hasAuthCookies || hasLocalStorageTokens) {
        setIsLogin(true);
        localStorage.setItem('preferred_auth_mode', 'signin');
      } else if (isFirstVisit) {
        setIsLogin(false);
        localStorage.setItem('ft_first_visit', 'visited');
        localStorage.setItem('preferred_auth_mode', 'signup');
      } else {
        const preferredAuthMode = localStorage.getItem('preferred_auth_mode');
        setIsLogin(preferredAuthMode !== 'signup');
      }
      
      setHasCheckedAuth(true);
    };

    // Immediate check without delay
    checkPreviousAuth();
  }, []);

  // Optimized: Debounced localStorage update
  useEffect(() => {
    if (!hasCheckedAuth) return;
    
    const timer = setTimeout(() => {
      localStorage.setItem('preferred_auth_mode', isLogin ? 'signin' : 'signup');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isLogin, hasCheckedAuth]);

  // Optimized: Non-blocking session clear
  useEffect(() => {
    if (!hasCheckedAuth || !clerk) return;
    
    const hasAuthCookies = /__clerk|__session/i.test(document.cookie);
    
    if (!hasAuthCookies) {
      // Don't wait for signOut to complete
      clerk.signOut().catch(() => {});
    }
  }, [clerk, hasCheckedAuth]);

  const socialProviders = [
    { 
      provider: "oauth_google", 
      label: "Continue with Google", 
      icon: <FcGoogle size={20} /> 
    },
    { 
      provider: "oauth_apple", 
      label: "Continue with Apple (Coming Soon)", 
      icon: <FaApple size={20} />,
      disabled: true 
    },
    { 
      provider: "oauth_github", 
      label: "Continue with Github", 
      icon: <FaGithub size={20} /> 
    },
  ];

  // Optimized signup handler with timeout protection
  const handleSocialAuth = useCallback(async (provider) => {
    if (!signInLoaded || !signUpLoaded) return;
    
    const providerInfo = socialProviders.find(p => p.provider === provider);
    if (providerInfo?.disabled) return;
    
    setLoading(true);
    setPendingProvider(provider);
    setErrorMsg("");
    
    // Track signup attempt (non-blocking)
    if (!isLogin) {
      localStorage.setItem('recent_signup_attempt', Date.now().toString());
      localStorage.setItem('preferred_auth_mode', 'signup');
    }
    
    try {
      // Add timeout protection for signup
      const authPromise = isLogin 
        ? signIn.authenticateWithRedirect({
            strategy: provider,
            redirectUrl: "/dashboard",
          })
        : signUp.authenticateWithRedirect({
            strategy: provider,
            redirectUrl: "/dashboard",
            // Remove unsafeMetadata if not needed
          });
      
      // Race between auth and timeout (10 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Authentication timeout')), 10000)
      );
      
      await Promise.race([authPromise, timeoutPromise]);
      
    } catch (err) {
      console.error("Auth error:", err);
      
      // Clear loading state immediately
      setLoading(false);
      setPendingProvider(null);
      
      // User-friendly error messages
      if (err.message === 'Authentication timeout') {
        setErrorMsg("Taking too long. Please check your connection and try again.");
      } else if (err.errors?.[0]?.code === 'captcha_invalid') {
        setErrorMsg("Security check failed. Please try again.");
      } else if (err.errors?.[0]?.code === 'form_identifier_not_found') {
        setErrorMsg("Account not found. Try signing up instead.");
      } else {
        const errorMessage = err.errors?.[0]?.longMessage || err.message || "Authentication failed.";
        setErrorMsg(errorMessage.length > 100 ? "Something went wrong. Please try again." : errorMessage);
      }
      
      // Clear signup attempt if failed (non-blocking)
      if (!isLogin) {
        setTimeout(() => {
          localStorage.removeItem('recent_signup_attempt');
        }, 0);
      }
    }
  }, [isLogin, signInLoaded, signUpLoaded, signIn, signUp]);

  // Preload Clerk resources for faster signup
  useEffect(() => {
    if (!hasCheckedAuth) return;
    
    // Preload OAuth providers in the background
    const preloadProviders = async () => {
      try {
        // This triggers Clerk to load necessary resources without blocking UI
        if (signInLoaded) {
          await signIn.get();
        }
        if (signUpLoaded) {
          await signUp.get();
        }
      } catch (error) {
        // Silent fail - this is just preloading
      }
    };
    
    // Delay preloading to avoid blocking initial render
    const timer = setTimeout(preloadProviders, 1000);
    return () => clearTimeout(timer);
  }, [hasCheckedAuth, signInLoaded, signUpLoaded, signIn, signUp]);

const subtitle = isLogin 
  ? (
    <>
      If you're <span className="font-bold text-green-400">new to our site</span>, just click <span className="font-bold text-green-400">Sign Up</span> to create an account. Already with us? Hop back in and continue.
    </>
  )
  : "Get started with your account today. Choose your preferred sign up method below.";

  // Memoized button click handlers
  const handleSignInClick = useCallback(() => {
    if (!loading) setIsLogin(true);
  }, [loading]);

  const handleSignUpClick = useCallback(() => {
    if (!loading) setIsLogin(false);
  }, [loading]);

  const handleToggleAuthMode = useCallback(() => {
    if (!loading) setIsLogin(!isLogin);
  }, [loading, isLogin]);

  if (!hasCheckedAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
        <Navbar scrolled={scrolled} />
        <div className="h-20" />
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full relative z-10">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded-lg w-48 mx-auto mb-8"></div>
              <div className="h-12 bg-white/10 rounded-lg w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-white/10 rounded-lg w-48 mx-auto mb-8"></div>
              <div className="space-y-3">
                <div className="h-12 bg-white/10 rounded-lg"></div>
                <div className="h-12 bg-white/10 rounded-lg"></div>
                <div className="h-12 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
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
                priority // Add priority for faster image load
              />
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                {isLogin ? "Welcome" : "Create"}
              </span>
              <span className="bg-gradient-to-b from-green-400 to-green-500 bg-clip-text text-transparent">
                {isLogin ? " Back" : " Account"}
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-6">
              {subtitle}
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={handleSignInClick}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isLogin 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Sign In
              </button>
              <button
                onClick={handleSignUpClick}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !isLogin 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            {errorMsg && (
              <p className="text-red-400 bg-red-400/10 p-2 rounded-lg text-sm mb-4 text-center">
                {errorMsg}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {socialProviders.map((btn) => {
                const isThisButtonLoading = loading && pendingProvider === btn.provider;
                return (
                  <button
                    key={btn.provider}
                    onClick={() => handleSocialAuth(btn.provider)}
                    disabled={loading || btn.disabled}
                    className={`relative w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-200 ${
                      btn.disabled
                        ? "opacity-50 cursor-not-allowed bg-white/5 border border-white/10 text-gray-500"
                        : "bg-white/5 border border-white/10 text-gray-100 hover:bg-white/20 active:scale-[0.99]"
                    } ${loading && !btn.disabled && pendingProvider !== btn.provider ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex-shrink-0">{btn.icon}</div>
                    <span className="truncate">
                      {isLogin 
                        ? btn.label 
                        : btn.label.replace("Continue", "Sign up")}
                    </span>
                    {isThisButtonLoading && (
                      <div className="absolute right-4">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="my-6 border-t border-white/10"></div>

            <p className="text-center text-xs text-gray-500">
              By {isLogin ? "continuing" : "signing up"}, you agree to our{" "}
              <Link 
                href="/terms" 
                className="text-green-400 hover:text-green-300 transition-colors"
                prefetch={true}
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link 
                href="/privacy" 
                className="text-green-400 hover:text-green-300 transition-colors"
                prefetch={true}
              >
                Privacy Policy
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleToggleAuthMode}
              disabled={loading}
              className={`text-gray-400 hover:text-white text-sm underline underline-offset-4 hover:underline-offset-2 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLogin 
                ? "New here? Create your account →" 
                : "Already have an account? Sign In →"}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}