"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return <div className="text-white">Loading...</div>;
  if (!user) return <div className="text-white">Redirecting...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-lg">
        
        {/* USER IMAGE */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.imageUrl}
            alt={user.fullName}
            width={70}
            height={70}
            className="rounded-full border border-white/20 shadow-lg"
          />
          <div>
            <p className="text-2xl font-semibold">{user.fullName}</p>
            <p className="text-gray-400 text-sm">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <SignOutButton redirectUrl="/login">
            <button className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
              Log Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
