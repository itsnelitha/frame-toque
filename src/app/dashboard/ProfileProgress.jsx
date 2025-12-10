"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProfileProgress() {
  const { user, isLoaded } = useUser();

  const [progress, setProgress] = useState(0);
  const [missingFields, setMissingFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    address: "",
  });

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(`/api/users/get-profile?userId=${user.id}`);
        const json = await res.json();

        if (json.success) {
          const p = json.profile || {};

          const finalData = {
            fullName: p.fullName || user.fullName || "",
            email: p.email || user?.primaryEmailAddress?.emailAddress || "",
            phone: p.phone || "",
            company: p.company || "",
            website: p.website || "",
            address: p.address || "",
          };

          setData(finalData);

          // Required fields only
          const required = [
            { key: "fullName", label: "Full Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "address", label: "Address" },
          ];

          const missingRequired = required
            .filter((f) => !finalData[f.key] || finalData[f.key].trim() === "")
            .map((f) => f.label);

          setMissingFields(missingRequired);

          const filledCount = required.length - missingRequired.length;
          const progressPercent = Math.round((filledCount / required.length) * 100);

          setProgress(progressPercent);
        }
      } catch (e) {
        console.error("ProfileProgress error:", e);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-green-400" />
      </div>
    );
  }

  // Hide component if profile is 100%
  if (progress === 100) return null;

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

      {/* Greeting */}
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-green-400" />
        <span className="text-green-400 font-semibold">Profile Status</span>
      </div>

      <h2 className="text-xl font-bold mb-3">
        Hey{" "}
        <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
          {user?.firstName || "there"}
        </span>
        , let’s complete your profile!
      </h2>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1 text-sm text-gray-300">
          <span>Completion</span>
          <span className="text-green-400 font-semibold">{progress}%</span>
        </div>

        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Missing Fields */}
      {missingFields.length > 0 && (
        <p className="text-sm text-gray-400 mb-4">
          You still need to complete:
          <span className="text-gray-200"> {missingFields.join(", ")}</span>
        </p>
      )}

      {/* Complete Profile Button */}
      <Link
        href="/dashboard/settings"
        className="inline-block px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
      >
        Complete Profile
      </Link>
    </div>
  );
}
