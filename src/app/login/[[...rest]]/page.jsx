"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const checkPreviousAuth = () => {
      const indicators = [
        localStorage.getItem('clerk-db-jwt'), // Clerk JWT
        localStorage.getItem('__clerk_client_jwt'), // Another Clerk JWT key
        sessionStorage.getItem('clerk-db-jwt'),
        document.cookie.includes('__session'), // Clerk session cookie
        document.cookie.includes('__client'),
      ];
      
      // Check for  Clerk cookies
      const hasClerkCookies = document.cookie.split(';').some(cookie => 
        cookie.trim().startsWith('__clerk') || 
        cookie.trim().startsWith('__session')
      );
      
      const hasPreviousAuth = indicators.some(indicator => 
        indicator && indicator !== 'null' && indicator !== 'undefined'
      ) || hasClerkCookies;
      
      // Also check for recent signup attempts in localStorage
      const recentSignupAttempt = localStorage.getItem('recent_signup_attempt');
      const isFirstVisit = localStorage.getItem('is_first_visit') === null;
      
      // Set initial auth state
      if (hasPreviousAuth || recentSignupAttempt) {
        setIsLogin(true);
      } else if (isFirstVisit) {
        setIsLogin(false);
        localStorage.setItem('is_first_visit', 'false');
      } else {e
        const preferredAuthMode = localStorage.getItem('preferred_auth_mode');
        if (preferredAuthMode === 'signup') {
          setIsLogin(false);
        }
      }
      
      setHasCheckedAuth(true);
    };

    const timer = setTimeout(checkPreviousAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasCheckedAuth) {
      localStorage.setItem('preferred_auth_mode', isLogin ? 'signin' : 'signup');
    }
  }, [isLogin, hasCheckedAuth]);

  useEffect(() => {
    if (!hasCheckedAuth) return;
    
    const hasActiveSession = localStorage.getItem('clerk-db-jwt') || 
                            document.cookie.includes('__session');
    
    if (clerk && !hasActiveSession) {
      clerk.signOut().catch(() => {});
    }
  }, [clerk, hasCheckedAuth]);

  // hidden CAPTCHA element for Clerk
  useEffect(() => {
    const captchaElement = document.getElementById('clerk-captcha');
    if (!captchaElement) {
      const div = document.createElement('div');
      div.id = 'clerk-captcha';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    
    return () => {
      const captchaElement = document.getElementById('clerk-captcha');
      if (captchaElement && captchaElement.parentNode) {
        captchaElement.parentNode.removeChild(captchaElement);
      }
    };
  }, []);

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

  async function handleSocialAuth(provider) {
    if (!signInLoaded || !signUpLoaded) return;
    
    // Check if provider is disabled
    const providerInfo = socialProviders.find(p => p.provider === provider);
    if (providerInfo?.disabled) return;
    
    setLoading(true);
    setPendingProvider(provider);
    setErrorMsg("");
    
    // Track signup attempt in localStorage
    if (!isLogin) {
      localStorage.setItem('recent_signup_attempt', Date.now().toString());
      localStorage.setItem('preferred_auth_mode', 'signup');
    }
    
    try {
      if (isLogin) {
        // Login flow
        await signIn.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/dashboard",
        });
      } else {
        // Signup flow
        await signUp.create({
          externalAccountStrategy: provider,
        });
        
        await signUp.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/dashboard",
          unsafeMetadata: {
            bypassCaptcha: true,
          },
        });
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg(err.errors?.[0]?.longMessage || err.message || "Something went wrong.");
      setLoading(false);
      setPendingProvider(null);
      
      // Remove signup attempt flag if failed
      if (!isLogin) {
        localStorage.removeItem('recent_signup_attempt');
      }
    }
  }

  const title = isLogin ? "Welcome Back" : "Create Account";
  const subtitle = isLogin 
    ? "If you recently created an account, just log in again to activate it. Already with us? Hop back in and continue."
    : "Get started with your account today. Choose your preferred sign up method below.";

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

            {/* Auth Mode Toggle */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setIsLogin(true)}
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
                onClick={() => setIsLogin(false)}
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
            {/* Hidden CAPTCHA container for Clerk */}
            <div id="clerk-captcha" style={{ display: "none" }}></div>
            
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
                        : "bg-white/5 border border-white/10 text-gray-100 hover:bg-white/20"
                    } ${loading && !btn.disabled && pendingProvider !== btn.provider ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex-shrink-0">{btn.icon}</div>
                    <span>
                      {isLogin 
                        ? btn.label.replace("Sign up", "Continue") 
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
            <button
              onClick={() => setIsLogin(!isLogin)}
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