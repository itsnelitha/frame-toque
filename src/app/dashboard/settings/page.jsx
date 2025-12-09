"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  User,
  Mail,
  Save,
  Phone,
  Building,
  MessageCircle,
  Upload,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    bio: "",
  });

  // Load Clerk user + DB data
  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      // Fetch DB profile first
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/users/get-profile?userId=${user.id}`);
          
          if (!res.ok) {
            console.error("Failed to fetch profile:", res.status);
            return;
          }
          
          const data = await res.json();
          
          if (data.success) {
            // Initialize form data with DB data (if exists) or Clerk data
            setFormData({
              name: data.profile?.fullName 
                ? data.profile.fullName 
                : user.fullName || "",
              email: data.profile?.email
                ? data.profile.email
                : user.primaryEmailAddress?.emailAddress || "",
              phone: data.profile?.phone || "",
              company: data.profile?.company || "",
              website: data.profile?.website || "",
              bio: data.profile?.bio || "",
            });
          } else {
            // If API failed, fallback to Clerk data only
            setFormData({
              name: user.fullName || "",
              email: user.primaryEmailAddress?.emailAddress || "",
              phone: "",
              company: "",
              website: "",
              bio: "",
            });
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          // Fallback to Clerk data only
          setFormData({
            name: user.fullName || "",
            email: user.primaryEmailAddress?.emailAddress || "",
            phone: "",
            company: "",
            website: "",
            bio: "",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [isLoaded, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be signed in to save changes.");
      return;
    }

    setSaving(true);

    try {
      // Update Clerk names only
      const fullName = formData.name.trim();
      const [firstName, ...lastNameParts] = fullName.split(" ");
      
      // Check if name has changed before updating Clerk
      if (user.fullName !== fullName) {
        await user.update({
          firstName: firstName || "",
          lastName: lastNameParts.join(" ") || "",
        });
      }

      // Save extra fields to DB
      const payload = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || formData.email,
        fullName,
        phone: formData.phone || null,
        company: formData.company || null,
        website: formData.website || null,
        bio: formData.bio || null,
      };

      const res = await fetch("/api/users/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Profile saved successfully!");
      } else {
        console.error("API Error:", data);
        alert(`Error: ${data.error || "Failed to save profile"}`);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Basic file validation
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, or GIF image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB.");
      return;
    }

    try {
      await user.setProfileImage({ file });
      alert("Photo updated successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    }
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "payment", name: "Payment", icon: CreditCard },
  ];

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <p className="text-gray-400">You must be signed in to access settings.</p>
        <Link 
          href="/sign-in" 
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Account{" "}
          </span>
          <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
            Settings
          </span>
        </h1>
        <p className="text-gray-400 text-lg">Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Contact Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 sm:p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>

                {/* Avatar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={user.imageUrl || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/default-avatar.png";
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-lg hover:bg-white/20 transition-colors mb-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                      <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>
                    <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        disabled
                        value={formData.email}
                        className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        placeholder="+94712345678"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      About / Project Interests
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Tell us about your business..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold transition-all ${
                      saving ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                  >
                    <Save className="w-5 h-5" />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === "payment" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Settings</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <p className="text-gray-400">Payment features coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}