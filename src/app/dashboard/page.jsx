"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";

function DashboardContent() {
  const { data: session, status } = useSession();

  // Show loading state while checking session
  if (status === "loading") {
    return <div className="p-10 text-white">Loading...</div>;
  }

  // If no session, redirect to /login
  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login?redirect=/dashboard";
    }
    return null; // prevent rendering while redirecting
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="text-lg">
        <strong>Name:</strong> {session.user.name}
      </p>
      <p className="text-lg">
        <strong>Email:</strong> {session.user.email}
      </p>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
      >
        Log Out
      </button>
    </div>
  );
}

// Only this route wraps with SessionProvider
export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
