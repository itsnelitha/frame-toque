"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";

function DashboardContent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-10 text-white">Loading...</div>;
  }

  if (!session) {
    return <div className="p-10 text-white">You are not logged in.</div>;
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

// Only this route gets SessionProvider
export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
