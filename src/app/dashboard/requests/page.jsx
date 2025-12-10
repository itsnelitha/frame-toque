"use client";

import Link from "next/link";
import { Package, MessageCircle, Plus, Download } from "lucide-react";

const myRequests = [
  {
    id: "REQ-001",
    service: "Web Development - Standard",
    date: "Jan 15, 2025",
    status: "in-progress",
    progress: 60,
  },
  {
    id: "REQ-002",
    service: "Graphics Design - Basic",
    date: "Jan 10, 2025",
    status: "completed",
    progress: 100,
  },
  {
    id: "REQ-003",
    service: "Video Editing - Premium",
    date: "Jan 8, 2025",
    status: "pending",
    progress: 0,
  },
];

const statusStyles = {
  "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function DashboardProjectsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My
            </span>
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              &nbsp;Requests
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Track the status of every service request you have made with Frame Toque.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            New Request
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Talk to Support
          </Link>
        </div>
      </div>

      {/* Requests List */}
      {myRequests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {myRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-colors"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {request.service}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusStyles[request.status]}`}>
                      {request.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Request ID: {request.id} • Submitted: {request.date}
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-64">
                  {request.status === "in-progress" && (
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>Progress</span>
                        <span className="text-green-400 font-semibold">{request.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                          style={{ width: `${request.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                      View Details
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-b from-green-600 to-green-700 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-2">No Requests Yet</h3>
          <p className="text-gray-400 mb-6">
            Submit your first service request to get started with Frame Toque.
          </p>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Browse Services
          </Link>
        </div>
      )}
    </div>
  );
}
