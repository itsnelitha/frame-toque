"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, MessageCircle, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";


import ProfileProgress from "./ProfileProgress";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHome() {
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser(); // <-- add isLoaded

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login"); 
    }
  }, [isLoaded, isSignedIn, router]);

  const quickActions = [
    {
      href: "/dashboard/services",
      icon: ShoppingCart,
      label: "Browse Services",
      className:
        "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity",
    },
    {
      href: "/contact",
      icon: MessageCircle,
      label: "Contact Us",
      className:
        "flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300",
    },
  ];

  if (!isLoaded || !isSignedIn) {
    // render nothing until auth state is loaded
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        {/* Pulse Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

       <div className="flex items-center gap-2 mb-2">
  <Sparkles className="w-6 h-6 text-green-400" />
  <span className="text-green-400 font-semibold">{getGreeting()}</span>
</div>
<h1 className="text-3xl sm:text-4xl font-bold mb-3">
  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
    Welcome back,&nbsp;
  </span>
  <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
    {user?.firstName || user?.fullName || "there"}!
  </span>
</h1>
<p className="text-gray-300 text-lg mb-6 max-w-2xl">
  Your one-stop solution for stunning websites, graphics, and videos.&nbsp;
  Explore our services and let's bring your vision to life!
</p>


<div className="flex flex-wrap gap-4">
  {quickActions.map((action, idx) => {
    const IconComponent = action.icon;
    return (
      <Link key={idx} href={action.href} className={action.className}>
        <IconComponent className="w-5 h-5" />
        {action.label}
      </Link>
    );
  })}
</div>
      </div>

<ProfileProgress />


    </div>
  );
}
